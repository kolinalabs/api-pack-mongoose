const { OperationFactory } = require("../../core/src/operation");

const createFromScopes = (name, scopes) => {
  return scopes.reduce((operations, scope) => {
    operations = operations.concat(OperationFactory.create(name, scope));
    return operations;
  }, []);
};

const createFromObjectConfig = (name, operations) => {
  const operationNames = Object.keys(OperationFactory.scopes);
  const scopedOperations = Object.keys(operations).filter(scope => {
    const value = operations[scope];
    return (
      typeof value === "boolean" && value && operationNames.indexOf(scope) >= 0
    );
  });
  return createFromScopes(name, scopedOperations);
};

const createFromModel = model => {
  let name = model.modelName;

  if (model.ApiPack) {
    const config = model.ApiPack();

    if (config) {
      if (config.name) name = config.name;

      if (config.operations) {
        if (Array.isArray(config.operations)) {
          return createFromScopes(name, config.operations);
        } else if (typeof config.operations === "object") {
          return createFromObjectConfig(name, config.operations);
        }
      }
    }
  }

  return OperationFactory.create(name);
};

const create = models => {
  models = Array.isArray(models) ? models : [models];
  return models.reduce((operations, model) => {
    operations = operations.concat(createFromModel(model));
    operations.map(operation => {
      operation.resource = model;
    });
    return operations;
  }, []);
};

module.exports = {
  create
};
