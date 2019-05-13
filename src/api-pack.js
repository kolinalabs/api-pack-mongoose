const ApiPackCore = require("@kolinalabs/nodejs-api-pack").ApiPack;

const { Persister, Provider, OperationFactory, Serializer } = require(".");

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
