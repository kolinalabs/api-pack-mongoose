const AbstractFilter = require("./abstract-filter");
const { Null, Operator, Strategy } = require("./utils/date");

class DateFilter extends AbstractFilter {
  filter(property, values, query) {
    const evaluate = value =>
      value instanceof Date
        ? value.toISOString()
        : new Date(value).toISOString();

    const nullManagement = this.properties[property]
      ? this.properties[property]
      : null;

    Object.keys(values).map(strategy => {
      const value = evaluate(values[strategy]);

      query.where(property);

      if (nullManagement === Null.exclude) {
        query.ne(null);
      }

      if (nullManagement === null || Null.exclude === nullManagement) {
        switch (strategy) {
          case Strategy.after:
            query.gte(value);
            break;
          case Strategy.before:
            query.lte(value);
            break;
          case Strategy.strictAfter:
            query.gt(value);
            break;
          case Strategy.strictBefore:
            query.lt(value);
            break;
        }
      } else {
        const expr = [{}];
        expr[0][property] = {};
        expr[0][property][`$${Operator[strategy]}`] = value;

        const exprNull = {};

        if (
          (nullManagement === Null.includeBefore &&
            [Strategy.before, Strategy.strictBefore].indexOf(strategy) >= 0) ||
          (nullManagement === Null.includeAfter &&
            [Strategy.after, Strategy.strictAfter].indexOf(strategy) >= 0) ||
          nullManagement === Null.include
        ) {
          exprNull[property] = { $eq: null };
          expr.push(exprNull);
          query.or(expr);
        } else {
          exprNull[property] = { $ne: null };
          expr.push(exprNull);
          query.and(expr);
        }
      }
    });
  }
}

module.exports = DateFilter;
