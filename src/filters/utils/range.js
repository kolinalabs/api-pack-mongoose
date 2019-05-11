
const STRATEGY_LT = 'lt'
const STRATEGY_LTE = 'lte'
const STRATEGY_GT = 'gt'
const STRATEGY_GTE = 'gte'
const STRATEGY_BETWEEN = 'between'

const Strategy = {
    [STRATEGY_LT]: STRATEGY_LT,
    [STRATEGY_LTE]: STRATEGY_LTE,
    [STRATEGY_GT]: STRATEGY_GT,
    [STRATEGY_GTE]: STRATEGY_GTE,
    [STRATEGY_BETWEEN]: STRATEGY_BETWEEN,
}

const evaluate = (value, strategy) => {
    if (typeof value === 'string') {
        if (strategy === STRATEGY_BETWEEN) {
            switch (value.indexOf('..')) {
                case -1: value = `0..${value}`; break;
                case 0: value = `0${value}`; break;
            }
            return value.split('..').map(v => Number(v))
        }
    }
    return Number(value)
}

module.exports = {
    Strategy,
    Strategies: Object.keys(Strategy),
    evaluate,
}
