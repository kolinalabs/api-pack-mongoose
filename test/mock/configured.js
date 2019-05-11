const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  description: String,
  amount: Number,
  position: Number,
  status: String,
  isFake: Boolean,
  startAt: Date,
  finishAt: Date
});

schema.statics.ApiPack = function() {
  return {
    name: "FullConfig",
    description: "Full configuration reference test",
    pathPrefix: "/before-path",
    operations: ["paginate", "retrieve", "create", "update"],
    filters: {
      boolean: {
        properties: ["isFake"]
      },
      date: {
        properties: ["startAt", "finishAt"]
      },
      exists: {
        properties: ["description"]
      },
      numeric: {
        properties: ["amount", "position"]
      },
      order: {
        properties: ["name", "amount", "position"]
      },
      range: {
        properties: ["amount", "position"]
      },
      search: {
        properties: {
          name: "partial",
          description: "partial",
          status: "exact"
        }
      }
    },
    pagination: {
      enabled: true, // + global, default = true
      clientEnabled: true, // + global, default = false
      itemsPerPage: 30, // + global, default = 30
      clientItemsPerPage: true, // + global, default = false
      maxItemsPerPage: 50, // + global, default = none
      // global only
      enabledParameter: "pagination", // + global, default = 'pagination'
      pageParameter: "page", // default = 'page',
      itemsPerPageParameter: "itemsPerPage" // default = 'itemsPerPage'
    }
  };
};

module.exports = mongoose.model("Configured", schema);
