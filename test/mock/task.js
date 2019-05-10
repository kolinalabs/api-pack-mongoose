const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  status: String,
  priority: Number
});

module.exports = mongoose.model("Task", schema);
