const AbstractFilter = require("./abstract-filter");
const { Strategy } = require("./utils/search");

const getRegex = (strategy, value) => {
  let flag = "";
  let pattern = value;

  if (strategy.indexOf("i") === 0) {
    strategy = strategy.substring(1);
    flag = "i";
  }

  switch (strategy) {
    case Strategy.exact:
      pattern = `^${pattern}$`;
      break;
    case Strategy.start:
      pattern = `^${pattern}`;
      break;
    case Strategy.end:
      pattern = `${pattern}$`;
      break;
    case Strategy.wordStart:
      pattern = `(\\s${pattern}|^${pattern})`;
      break;
  }

  return new RegExp(pattern, flag);
};

class SearchFilter extends AbstractFilter {
  filter(property, value, query) {
    const strategy = this.properties[property]
      ? this.properties[property]
      : Strategy.exact;

    if (typeof value === "string") {
      query.regex(property, getRegex(strategy, value));
    } else {
      /** @todo works only STRATEGY_EXACT */
      query.where(property).in(value);
    }
  }
}

module.exports = SearchFilter;
