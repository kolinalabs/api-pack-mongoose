const { OperationFactory } = require("@kolinalabs/nodejs-api-pack");

const createFromScopes = config => {
  return config.operations.reduce((operations, scope) => {
    const operation = OperationFactory.create(config.name, scope);

    if (config.pathPrefix) {
      operation.path = config.pathPrefix + operation.path;
    }

    operations.push(operation);

    return operations;
  }, []);
};

const createFromObjectConfig = config => {
  const operationNames = Object.keys(OperationFactory.scopes);
  config.operations = Object.keys(config.operations).filter(scope => {
    const value = config.operations[scope];
    return (
      typeof value === "boolean" && value && operationNames.indexOf(scope) >= 0
    );
  });
  return createFromScopes(config);
};

const getApiConfig = model => {
  return Object.assign(
    {
      name: model.modelName,
      description: `${model.modelName} resource`,
      pathPrefix: "",
      operations: ["paginate", "retrieve", "create", "update"],
      filters: {},
      pagination: {
        enabled: true,
        clientEnabled: false,
        itemsPerPage: 30,
        clientItemsPerPage: false,
        maxItemsPerPage: null,
        enabledParameter: "pagination",
        pageParameter: "page",
        itemsPerPageParameter: "itemsPerPage"
      }
    },
    model.ApiPack ? model.ApiPack() : {}
  );
};

const createFromModel = model => {
  let name = model.modelName;
  /** @todo move this function for model-loader.js */
  const config = getApiConfig(model);

  if (config.operations) {
    if (Array.isArray(config.operations)) {
      return createFromScopes(config);
    } else if (typeof config.operations === "object") {
      return createFromObjectConfig(config);
    }
  }

  return OperationFactory.create(name);
};

const create = models => {
  models = Array.isArray(models) ? models : [models];
  const operations = models.reduce((operations, model) => {
    operations = operations.concat(createFromModel(model));
    operations.map(operation => {
      operation.resource = model;
    });
    return operations;
  }, []);

  return operations;
};

module.exports = {
  create
};
