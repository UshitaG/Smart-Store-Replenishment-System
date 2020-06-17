var mongoose = require("mongoose");

var item = new mongoose.Schema({
  machine_no: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  per_unit_weight: {
    type: Number
  },
  current_weight: {
    type: Number,
    default: 0
  },
  units_to_order: {
    type: Number,
    required: true
  },
  current_order: {
    type: Number,
    default: 0
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }
});

var Item = mongoose.model("Item", item);

module.exports = { Item };
