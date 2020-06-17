const mongoose = require("mongoose");

const URI =
  "mongodb+srv://ushita:ushita26@cluster0-s5zz8.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Database Connected");
};

module.exports = connectDB;
