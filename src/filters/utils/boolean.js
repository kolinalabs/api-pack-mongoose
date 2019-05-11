const boolify = (value, _default = false) => {
  if ([true, "true", 1, "1", "on", "yes"].indexOf(value) >= 0) {
    return true;
  } else if ([false, "false", 0, "0", "off", "no"].indexOf(value) >= 0) {
    return false;
  }
  return _default;
};

module.exports = {
  boolify
};
