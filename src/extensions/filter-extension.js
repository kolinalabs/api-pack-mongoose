const Filters = require("../filters");
const ModelLoader = require("../model-loader");

const FilterExtension = {
  name: "FilterExtension",
  filters: {
    boolean: Filters.BooleanFilter,
    date: Filters.DateFilter,
    exists: Filters.ExistsFilter,
    numeric: Filters.NumericFilter,
    order: Filters.OrderFilter,
    range: Filters.RangeFilter,
    search: Filters.SearchFilter
  },
  apply(query, operation) {
    const resourceFilters = ModelLoader.getFilters(operation.resource);
    if (resourceFilters) {
      Object.keys(resourceFilters).map(id => {
        if (this.filters[id]) {
          const properties = resourceFilters[id].properties;
          const filter = new this.filters[id](properties);
          /** @todo Check if order filter is a last called */
          filter.apply(query, operation.context);
        }
      });
    }
  }
};

module.exports = FilterExtension;
