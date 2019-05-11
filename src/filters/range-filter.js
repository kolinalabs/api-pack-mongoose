const AbstractFilter = require("./abstract-filter");
const { Strategy, evaluate } = require("./utils/range");

class RangeFilter extends AbstractFilter {
  filter(property, values, query) {
    query.where(property);

    Object.keys(values).reduce((criteria, strategy) => {
      const value = evaluate(values[strategy], strategy);

      if (strategy === Strategy.between) {
        query.gt(value[0]);
        query.lt(value[1]);
      } else {
        query[strategy](value);
      }

      return criteria;
    }, {});
  }
}

module.exports = RangeFilter;
