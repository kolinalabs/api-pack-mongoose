
const STRATEGY_PARTIAL = 'partial'
const STRATEGY_IPARTIAL = 'ipartial'
const STRATEGY_EXACT = 'exact'
const STRATEGY_IEXACT = 'iexact'
const STRATEGY_START = 'start'
const STRATEGY_ISTART = 'istart'
const STRATEGY_END = 'end'
const STRATEGY_IEND = 'iend'
const STRATEGY_WORD_START = 'word_start'
const STRATEGY_IWORD_START = 'iword_start'

const Strategy = {
    partial: STRATEGY_PARTIAL,
    ipartial: STRATEGY_IPARTIAL,
    exact: STRATEGY_EXACT,
    iexact: STRATEGY_IEXACT,
    start: STRATEGY_START,
    istart: STRATEGY_ISTART,
    end: STRATEGY_END,
    iend: STRATEGY_IEND,
    wordStart: STRATEGY_WORD_START,
    iwordStart: STRATEGY_IWORD_START,
}

module.exports = {
    Strategy,
}
