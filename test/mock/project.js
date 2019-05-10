const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  amount: Number
});

module.exports = mongoose.model("Project", schema);
