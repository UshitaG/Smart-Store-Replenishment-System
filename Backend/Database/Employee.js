var mongoose = require("mongoose");

var employee = new mongoose.Schema({
  employee_code: {
    type: String,
    required: true,
    unique: true
  },

  employee_name: {
    type: String
  },
  employee_email: {
    type: String
  },
  employee_contact: {
    type: Number
  }
});

var Employee = mongoose.model("Employee", employee);

module.exports = { Employee };
