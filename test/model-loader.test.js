const { Configured, Project } = require("./mock");
const ModelLoader = require("../src/model-loader");

describe("ApiPack config loader", () => {
  const paginationKeys = [
    "enabled",
    "clientEnabled",
    "itemsPerPage",
    "clientItemsPerPage",
    "maxItemsPerPage",
    "enabledParameter",
    "pageParameter",
    "itemsPerPageParameter"
  ];

  it("Configured", () => {
    const fullConfigKeys = [
      "name",
      "description",
      "pathPrefix",
      "operations",
      "filters",
      "pagination"
    ];

    const filterKeys = [
      "boolean",
      "date",
      "exists",
      "numeric",
      "order",
      "range",
      "search"
    ];

    const config = ModelLoader.getConfig(Configured);

    expect(Object.keys(config).length).toBe(fullConfigKeys.length);
    expect(Object.keys(config.filters).length).toBe(filterKeys.length);
    expect(Object.keys(config.pagination).length).toBe(paginationKeys.length);
  });

  it("Pagination config", () => {
    const pagination = ModelLoader.getPagination(Project);
    expect(Object.keys(pagination).length).toBe(paginationKeys.length);
    expect(pagination.itemsPerPage).toBe(50);
  });
});
