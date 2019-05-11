const STRATEGY_BEFORE = "before";
const STRATEGY_STRICT_BEFORE = "strict_before";
const STRATEGY_AFTER = "after";
const STRATEGY_STRICT_AFTER = "strict_after";

const EXCLUDE_NULL = "exclude_null";
const INCLUDE_NULL = "include_null";
const INCLUDE_NULL_BEFORE = "include_null_before";
const INCLUDE_NULL_AFTER = "include_null_after";

const Strategy = {
  after: STRATEGY_AFTER,
  strictAfter: STRATEGY_STRICT_AFTER,
  before: STRATEGY_BEFORE,
  strictBefore: STRATEGY_STRICT_BEFORE
};

const Null = {
  exclude: EXCLUDE_NULL,
  include: INCLUDE_NULL,
  includeBefore: INCLUDE_NULL_BEFORE,
  includeAfter: INCLUDE_NULL_AFTER
};

const Operator = {
  [STRATEGY_BEFORE]: "lte",
  [STRATEGY_STRICT_BEFORE]: "lt",
  [STRATEGY_AFTER]: "gte",
  [STRATEGY_STRICT_AFTER]: "gt"
};

module.exports = {
  STRATEGY_BEFORE,
  STRATEGY_STRICT_BEFORE,
  STRATEGY_AFTER,
  STRATEGY_STRICT_AFTER,
  EXCLUDE_NULL,
  INCLUDE_NULL,
  INCLUDE_NULL_BEFORE,
  INCLUDE_NULL_AFTER,
  Null,
  Operator,
  Strategy,
  Strategies: Object.keys(Operator)
};
