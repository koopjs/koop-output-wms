const { getMap } = require('./operations')

/**
 * Route requests to proper operations
 * @param {object} req
 * @param {object} res
 * @param {object} data
 */
function route (req, res, data) {
  const queryParams = parseQueryParams(req.query)

  switch (queryParams.REQUEST) {
    case 'GetMap':
      getMap(queryParams, data, res)
      break
    default:
      res.status(404).json(new Error(`REQUEST=${queryParams.REQUEST} is not supported`))
  }
}

/**
 * Parse the query parameters
 * @param {*} query
 */
function parseQueryParams (query = {}) {
  return Object.keys(query).reduce((options, key) => {
    options[key.toLowerCase()] = tryParse(query[key])
    return options
  }, {})
}

/**
 *
 * @param {*} input
 */
function tryParse (input) {
  try {
    return JSON.parse(input)
  } catch (e) {
    return input
  }
}

module.exports = { route }
