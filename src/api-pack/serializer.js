module.exports = {
  serializeItem(item) {
    /**
     * Custom mongoose document serialization
     */
    const data = item.toObject();

    delete data.email;
    delete data.position;
    delete data.__v;

    data.id = data._id;

    delete data._id;

    return data;
  },
  serialize(operation) {
    if (!operation.data) {
      operation.status = 204;
      return;
    }

    if (Array.isArray(operation.data)) {
      operation.data = operation.data.reduce((data, item) => {
        data.push(this.serializeItem(item));
        return data;
      }, []);
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
