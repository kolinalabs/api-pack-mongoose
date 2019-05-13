const ApiPackCore = require("@kolinalabs/nodejs-api-pack").ApiPack;

const Persister = require("./persister");
const Provider = require("./provider");
const OperationFactory = require("./operation-factory");
const Serializer = require("./serializer");

class ApiPack extends ApiPackCore {
  constructor() {
    super();
    this.persister(Persister);
    this.provider(Provider);
    this.serializer(Serializer);
  }

  getOperations(models = []) {
    return OperationFactory.create(models);
  }
}

module.exports = ApiPack;
