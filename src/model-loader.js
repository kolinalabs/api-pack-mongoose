const getConfig = model => {
  return model.ApiPack ? model.ApiPack() : {};
};

const getFilters = model => {
  const config = getConfig(model);
  return config.filters ? config.filters : {};
};

const getPagination = model => {
  const config = getConfig(model);
  const pagination = config.pagination || {};

  return Object.assign(
    {
      enabled: true,
      clientEnabled: false,
      itemsPerPage: 30,
      clientItemsPerPage: false,
      maxItemsPerPage: null,
      enabledParameter: "pagination",
      pageParameter: "page",
      itemsPerPageParameter: "itemsPerPage"
    },
    pagination
  );
};

module.exports = {
  getConfig,
  getFilters,
  getPagination
};
