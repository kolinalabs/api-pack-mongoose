
const AbstractFilter = require('./abstract-filter')

class NumericFilter extends AbstractFilter {
    filter(property, value, query) {
        query.where(property).equals(Number(value))
    }
}

module.exports = NumericFilter
