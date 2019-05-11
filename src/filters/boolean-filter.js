const AbstractFilter = require("./abstract-filter");
const { boolify } = require("./utils/boolean");

class BooleanFilter extends AbstractFilter {
  filter(property, value, query) {
    query.where(property).equals(boolify(value));
  }
}

module.exports = BooleanFilter;
