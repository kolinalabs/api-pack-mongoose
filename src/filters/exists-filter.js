const AbstractFilter = require("./abstract-filter");
const { boolify } = require("./utils/boolean");

class ExistsFilter extends AbstractFilter {
  filter(property, value, query) {
    if (value.hasOwnProperty("exists")) {
      query.where(property).exists(boolify(value.exists));
    }
  }
}

module.exports = ExistsFilter;
