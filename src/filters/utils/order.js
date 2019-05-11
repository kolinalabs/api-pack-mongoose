
const normalizeFilters = (context, parameterName) => {

    const contextFilters = context.filters[parameterName]

    return Array.isArray(contextFilters)
        ? contextFilters.reduce((acc, property) => {
            acc[property] = null
            return acc
        }, {})
        : Object.keys(contextFilters).reduce((acc, property) => {
            acc[property] = contextFilters[property]
            return acc
        }, {})
}

module.exports = {
    normalizeFilters,
}
