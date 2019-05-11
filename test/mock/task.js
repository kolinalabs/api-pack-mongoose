const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  status: String,
  priority: Number,
  closed: Boolean,
  openedAt: Date,
  closedAt: Date
});

module.exports = mongoose.model("Task", schema);
