/**
 * Normailize the query parameters - all lowercase
 * @param {*} query
 */
function normailizeQueryParams (query = {}) {
  return Object.keys(query).reduce((options, key) => {
    options[key.toLowerCase()] = query[key]
    return options
  }, {})
}

module.exports = { normailizeQueryParams }
