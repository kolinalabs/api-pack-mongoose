const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  birth: Date,
  enabled: Boolean
});

/** @see https://mongoosejs.com/docs/guide.html#statics */
schema.statics.ApiPack = function() {
  return {
    name: "CustomContact",

    /** @todo array mode */
    // operations: ["paginate", "retrieve", "create"]

    /** @todo object<boolean> mode */
    operations: {
      paginate: true,
      retrieve: true,
      create: true,
      update: false,
      remove: false
    }
  };
};

module.exports = mongoose.model("Contact", schema);
