const { FilterExtension, PagerExtension } = require("./extensions");

module.exports = {
  extensions: [FilterExtension, PagerExtension],
  async getCollection(operation) {
    const query = operation.resource.find();

    for (let i = 0; i < this.extensions.length; i++) {
      const extension = this.extensions[i];
      extension.apply(query, operation);
      if (extension.supportsResult && extension.supportsResult(operation)) {
        operation.data = await extension.getResult(query, operation);
        return;
      }
    }

    operation.data = await query.exec();
  },
  async getItem(operation) {
    const identifiers = operation.identifiers.id;
    operation.data = await operation.resource.findById(identifiers);
  },
  getInstance(operation) {
    operation.data = new operation.resource();
  }
};
