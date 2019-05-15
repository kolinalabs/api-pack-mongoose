const Paginator = require("../paginator");
const ModelLoader = require("../model-loader");
const BooleanHelper = require("../filters/utils/boolean");

const resolvePagination = operation => {
  const pagination = ModelLoader.getPagination(operation.resource);
  const contextQuery = operation.context.query;

  if (
    pagination.clientEnabled &&
    contextQuery.hasOwnProperty(pagination.enabledParameter)
  ) {
    pagination.enabled = BooleanHelper.boolify(
      contextQuery[pagination.enabledParameter]
    );
  }

  if (
    pagination.clientItemsPerPage &&
    contextQuery.hasOwnProperty(pagination.itemsPerPageParameter)
  ) {
    pagination.itemsPerPage = parseInt(
      contextQuery[pagination.itemsPerPageParameter]
    );
  }

  if (
    pagination.maxItemsPerPage &&
    pagination.itemsPerPage > pagination.maxItemsPerPage
  ) {
    pagination.itemsPerPage = pagination.maxItemsPerPage;
  }

  pagination.page = parseInt(contextQuery[pagination.pageParameter])
    ? parseInt(contextQuery[pagination.pageParameter])
    : 1;

  pagination.offset = (pagination.page - 1) * pagination.itemsPerPage;

  return pagination;
};

const PagerExtension = {
  name: "PagerExtension",
  supports: "collection:get",
  apply(query, operation) {
    if (!this.supportsResult(operation)) {
      return;
    }

    const pagination = resolvePagination(operation);

    query.skip(pagination.offset).limit(pagination.itemsPerPage);
  },
  supportsResult(operation) {
    return resolvePagination(operation).enabled;
  },
  async getResult(query, operation) {
    const countQuery = operation.resource.find(query._conditions);
    const totalItems = await countQuery.countDocuments();
    const maxResults = query.options.limit;
    const lastPage = 0 >= maxResults ? 1 : Math.ceil(totalItems / maxResults);

    const items = await query.exec();

    return new Paginator(items, totalItems, lastPage);
  }
};

module.exports = PagerExtension;
