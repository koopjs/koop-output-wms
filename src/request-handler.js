const { getMap, getCapabilities } = require('./operations')
const { normailizeQueryParams } = require('./utils')

/**
 * Pull data from the provider's model and send it on to the getMap function for rendering
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} model - Model for provider determined by the request
 */
function getDataGetMap (req, res, model) {
  model.pull(req, (e, data) => {
    if (e) res.status(e.code || 500).json({ error: e.message })
    else getMap(req.query, data, res)
  })
}

/**
 * Handle a WMS request according to its "request" query parameter
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
function requestHandler (req, res) {
  // Ensure all the query parameters have keys that are lowercase
  req.query = normailizeQueryParams(req.query)

  // Route request to operation
  switch (req.query.request) {
    case 'GetMap':
      // Note that "this" here is the WMS module itself.  Koop has attached "model" to it during registration
      getDataGetMap(req, res, this.model)
      break
    case 'GetCapabilities':
      getCapabilities(req.query, res)
      break
    default:
      res.status(404).json(new Error(`?request=${req.query.request} is not supported`))
  }
}

module.exports = requestHandler
