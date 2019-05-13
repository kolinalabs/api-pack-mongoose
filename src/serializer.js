const Paginator = require("./paginator");

module.exports = {
  serializeItem(item) {
    const data = item.toObject();

    data.id = data._id;

    delete data._id;
    delete data.__v;

    return data;
  },
  serializeItems(items = []) {
    return items.reduce((data, item) => {
      data.push(this.serializeItem(item));
      return data;
    }, []);
  },
  serialize(operation) {
    if (!operation.data) {
      return;
    }
    if (Array.isArray(operation.data)) {
      operation.data = this.serializeItems(operation.data);
    } else if (operation.data instanceof Paginator) {
      operation.data.items = this.serializeItems(operation.data.items);
    } else {
      operation.data = this.serializeItem(operation.data);
    }
  },
  deserialize(operation, data = {}) {
    if (operation.method === "post" || operation.method === "put") {
      operation.data.set(data);
    }
  }
};
