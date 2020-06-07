var express = require("express");
var connectDB = require("./Database/Connection");
var { Item } = require("./Database/Item");
var bodyparser = require("body-parser");
var nodemailer = require("nodemailer");
var cors = require("cors");
var { ObjectId } = require("mongodb");
var { Employee } = require("./Database/Employee");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "4439982f",
  apiSecret: "FfD1MxzE7toDirsm"
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lowes.store99@gmail.com",
    pass: "lowes123"
  }
});
var app = express();
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
connectDB();

var minutes = 15;
the_interval = 10 * 1000;

//This function checks our databse of items at set interval of an hour, to check if any item has less than 10 units left
setInterval(function() {
  Item.find(function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    for (var i = 0; i < data.length; i++) {
      // console.log(
      //   data[i].current_weight +
      //     " " +
      //     data[i].per_unit_weight +
      //     " " +
      //     data[i].name
      // );

      //If any item has less than 10 units and an restock item mail has not been sent then mail is sent.
      if (
        data[i].current_weight < data[i].per_unit_weight * 10 &&
        data[i].current_order == 0
      ) {
        var h = data[i].machine_no;
        var name = data[i].name;
        var stock = data[i].current_weight / data[i].per_unit_weight;
        var units = data[i].units_to_order;
        if (!ObjectId.isValid(data[i].employee))
          return res.status(400).send("invalid id");
        //Get email_id of the employee for item which is less in stock.
        Employee.findById(data[i].employee, function(err, emp) {
          if (err) {
            console.log(err);
          } else {
            var mailOptions = {
              from: "chocolily26@gmail.com",
              to: emp.employee_email,
              subject: "Replenish Shelf",
              text: `Shelf No: ${h}\nItem Name: ${name} \nStock remaning: ${stock} \nNumber of Units: ${units}`
            };
            /*
        //Send a text messsage to employee
        const from = "Hey!";
        const to = JSON.stringify(data[i].employee_contact);
        const text = "Gordhob";
        console.log(to);
        nexmo.message.sendSms(from, to, text, (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            if (responseData.messages[0]["status"] === "0") {
              console.log(responseData);
            } else {
              console.log(
                `Message failed with error: ${
                  responseData.messages[0]["error-text"]
                }`
              );
            }
          }
        });
        */
            //Email sent to employee replenish stock.
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                //Once order is placed, order_placed column is checked so that within one hour same order is not repeated while previous order is to be received.
                Item.findOne({ machine_no: h }, function(err, ans) {
                  if (err) {
                    console.log(err);
                  } else {
                    ans.current_order = 1;
                  }
                  ans.save(function(err, updated) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(info);
                      console.log("Order placed:" + updated.name);
                    }
                  });
                });
              }
            });
          }
        });
      }

      //If items restocked weight increases, so change the order_placed column to 0 once order is received.
      else if (
        data[i].current_order == 1 &&
        data[i].current_weight >= data[i].per_unit_weight * 10
      ) {
        var h = data[i].machine_no;
        Item.findOne({ machine_no: h }, function(err, res) {
          if (err) {
            console.log(err);
          } else {
            res.current_order = 0;
            res.save(function(err, updated) {
              if (err) console.log(err);
              else {
                console.log("Items restocked:" + updated.name);
              }
            });
          }
        });
      }
    }
  });
}, the_interval);

//Allows the store to add new shelves and items to the database
app.post("/add", (req, res) => {
  Employee.find({ employee_code: req.body.employee_code }, function(err, emp) {
    if (err) {
      console.log(err);
    } else {
      //res.send(emp);
      if (emp.length == 0) res.send("No");
      else {
        var itemModel = new Item({
          machine_no: req.body.machine_no,
          name: req.body.name,
          per_unit_weight: req.body.per_unit_weight,
          units_to_order: req.body.units_to_order,
          employee: emp[0]._id
        });
        itemModel.save(function(err, item) {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          }
          console.log(item.name + " saved to collection.");
          res.send(item);
        });
      }
    }
  });
});

//Add New Employees
app.post("/addemp", (req, res) => {
  var employeeModel = new Employee({
    employee_code: req.body.employee_code,
    employee_name: req.body.employee_name,
    employee_email: req.body.employee_email,
    employee_contact: req.body.employee_contact
  });
  employeeModel.save(function(err, emp) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    console.log(emp.employee_name + " saved to collection.");
    res.send(emp);
  });
});

//Fetch all the stock in the home page
app.get("/", (req, res) => {
  Item.find()
    .sort({ machine_no: 1 })
    .populate("employee")
    .exec()
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      res.status(500).send(err);
      return;
    });
});

//Fetch all employees
app.get("/emp", (req, res) => {
  Employee.find()
    .sort({ employee_code: 1 })
    .exec()
    .then(emp => {
      res.send(emp);
    })
    .catch(err => {
      res.status(500).send(err);
      return;
    });
});

//Delete a shelf from database
app.delete("/deleteitem", (req, res) => {
  Item.findOneAndDelete({ machine_no: req.body.number }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result.name);
    }
  });
});

//Get items to be restocked
app.get("/current", (req, res) => {
  Item.find({ current_order: 1 })
    .sort({ machine_no: 1 })
    .populate("employee")
    .exec()
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      res.status(500).send(err);
      return;
    });
});

//Get details of each shelf
app.get("/item/:id", (req, res) => {
  Item.findById(req.params.id)
    .populate("employee")
    .exec()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(500).send(err);
      return;
    });
});

//Edit a certain detail of a shelf
app.patch("/edit", (req, res) => {
  if (!ObjectId.isValid(req.body.id)) return res.status(400).send("invalid id");
  Employee.find({ employee_code: req.body.employee_code }, function(err, emp) {
    if (err) {
      console.log(err);
    } else {
      if (emp.length == 0) res.send("No");
      else {
        let query = { $set: {} };
        for (let key in req.body) //if (product[key] && product[key] !== req.body[key]) // if the field we have in req.body exists, we're gonna update it
          query.$set[key] = req.body[key];
        query.employee = emp[0]._id;
        //console.log(query);
        Item.findByIdAndUpdate(req.body.id, query, { new: true }, function(
          e,
          item
        ) {
          if (e) {
            console.log(e);
            res.send(e);
            return;
          }
          res.send(item);
        });
      }
    }
  });
});

const Port = process.env.Port || 5000;

app.listen(Port, () => console.log("Server started"));
