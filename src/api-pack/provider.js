module.exports = {
  async getCollection(operation) {
    operation.data = await operation.resource.find();
  },
  async getItem(operation) {
    const identifiers = operation.identifiers.id;
    operation.data = await operation.resource.findById(identifiers);
  },
  getInstance(operation) {
    operation.data = new operation.resource();
  }
};
