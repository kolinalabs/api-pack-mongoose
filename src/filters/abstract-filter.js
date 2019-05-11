class AbstractFilter {
  constructor(properties = []) {
    if ("AbstractFilter" === this.constructor.name) {
      throw new Error("The AbstractFilter can not be instantiated directly");
    }

    this.properties = properties;
  }

  checkQuery(query) {
    if (!query._conditions || typeof query.where !== "function") {
      throw new Error("Invalid mongoose query instance");
    }
  }

  apply(query, context) {
    this.checkQuery(query);

    if (!context || !context.filters) return;

    Object.keys(context.filters).map(property => {
      if (
        (Array.isArray(this.properties) &&
          this.properties.indexOf(property) >= 0) ||
        this.properties.hasOwnProperty(property)
      ) {
        this.filter(property, context.filters[property], query);
      }
    });
  }

  filter(property, value, query) {
    throw new Error("The 'filter' method must be implemented");
  }
}

module.exports = AbstractFilter;
