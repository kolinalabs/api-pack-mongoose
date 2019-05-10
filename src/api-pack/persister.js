module.exports = {
  async persist(operation) {
    await operation.data.save();
  },
  async remove(operation) {
    await operation.data.remove();
    operation.data = null;
  }
};
