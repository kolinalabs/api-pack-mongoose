const {
  FilterExtension,
  PagerExtension,
  SupportsChecker
} = require("./extensions");

const applyExtensions = async (query, operation, extensions) => {
  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i];
    if (SupportsChecker.supports(extension, operation, query)) {
      extension.apply(query, operation);
      if (extension.supportsResult && extension.supportsResult(operation)) {
        operation.data = await extension.getResult(query, operation);
        return;
      }
    }
  }
};

const finishProviderGetData = async (query, operation, extensions) => {
  await applyExtensions(query, operation, extensions);
  if (operation.data) return;
  operation.data = await query.exec();
};

module.exports = {
  extensions: [FilterExtension, PagerExtension],
  async getCollection(operation) {
    const query = operation.resource.find();
    await finishProviderGetData(query, operation, this.extensions);
  },
  async getItem(operation) {
    const identifiers = operation.identifiers.id;
    const query = operation.resource.findById(identifiers);
    await finishProviderGetData(query, operation, this.extensions);
  },
  getInstance(operation) {
    operation.data = new operation.resource();
  }
};
