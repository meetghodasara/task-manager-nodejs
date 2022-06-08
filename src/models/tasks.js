const mongoose = require("mongoose");
const validator = require("validator");

const task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  Status: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = task;
