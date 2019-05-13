class Paginator {
  constructor(items, totalItems, lastPage) {
    this.items = items;
    this.totalItems = totalItems;
    this.lastPage = lastPage;
  }
}

module.exports = Paginator;
