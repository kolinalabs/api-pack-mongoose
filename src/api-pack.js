const ApiPackCore = require("@kolinalabs/nodejs-api-pack").ApiPack;

const Persister = require("./persister");
const Provider = require("./provider");
const OperationFactory = require("./operation-factory");
const Serializer = require("./serializer");

class ApiPack extends ApiPackCore {
  constructor(models = []) {
    super();
    this.persister(Persister);
    this.provider(Provider);
    this.serializer(Serializer);
    this.models = models;
    this.operations = OperationFactory.create(models);
  }

  routing(handler) {
    return handler(this, this.operations);
  }
}

module.exports = ApiPack;
