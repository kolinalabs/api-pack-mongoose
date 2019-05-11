const AbstractFilter = require("./abstract-filter");
const { normalizeFilters } = require("./utils/order");

class OrderFilter extends AbstractFilter {
  constructor(properties, parameterName = "order") {
    const propertyKeys = Array.isArray(properties)
      ? properties
      : Object.keys(properties);

    const normalized = propertyKeys.reduce((a, c) => {
      a[c] =
        typeof properties[c] === "string"
          ? { defaultDirection: properties[c] }
          : properties[c]
          ? properties[c]
          : "asc";
      return a;
    }, {});

    super(normalized);

    this.parameterName = parameterName;
  }

  apply(query, context) {
    super.checkQuery(query);

    if (
      context.filters &&
      !context.filters.hasOwnProperty(this.parameterName)
    ) {
      return;
    }

    const filters = normalizeFilters(context, this.parameterName);

    Object.keys(filters).forEach(property => {
      this.filter(property, filters[property], query);
    });
  }

  filter(property, direction, query) {
    if (direction === null) {
      direction = this.properties[property].defaultDirection;
    }

    if (
      direction === null ||
      ["ASC", "DESC", "1", "-1"].indexOf(direction.toUpperCase()) === -1
    ) {
      return;
    }

    query.sort({ [property]: [direction] });
  }
}

module.exports = OrderFilter;
