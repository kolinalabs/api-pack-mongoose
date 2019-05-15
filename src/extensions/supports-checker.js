const isMixed = support => {
  return support.indexOf(":") >= 0;
};

const supportsMixed = (mixed, type, method) => {
  const [_type, _method] = mixed.split(":");
  return _type.toLowerCase() === type && _method.toLowerCase() === method;
};

const supports = (extension, operation, query) => {
  if (!operation || !operation.method || !operation.type) {
    return typeof extension.supports === "boolean" ? extension.supports : true;
  }

  const supports = extension.supports;
  const method = operation.method.toLowerCase();
  const type = operation.type.toLowerCase();

  switch (typeof supports) {
    case "undefined":
      return true;
    case "string":
      if (isMixed(supports)) {
        return supportsMixed(supports, type, method);
      }
      return [method, type].includes(supports.toLowerCase());
    case "object":
      if (Array.isArray(supports)) {
        const mixedSupports = supports
          .filter(support => isMixed(support))
          .filter(mixed => supportsMixed(mixed, type, method)).length;

        return (
          supports.includes(method) || supports.includes(type) || mixedSupports
        );
      }
      break;
    case "function":
      return supports(operation, query);
      break;
    case "boolean":
      return supports;
    default:
      return false;
  }
};

module.exports = {
  supports
};
