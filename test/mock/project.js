const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  amount: Number
});

schema.statics.ApiPack = function() {
  return {
    pagination: {
      itemsPerPage: 50
    }
  };
};

module.exports = mongoose.model("Project", schema);
