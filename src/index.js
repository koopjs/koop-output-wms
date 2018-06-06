const router = require('./router')

function WMS () {}

WMS.prototype.serve = function (req, res) {
  this.model.pull(req, (e, data) => {
    if (e) res.status(e.code || 500).json({ error: e.message })
    else router.route(req, res, data)
  })
}

WMS.version = require('../package.json').version
WMS.type = 'output'
WMS.routes = [
  {
    path: 'wms',
    methods: ['get', 'post'],
    handler: 'serve'
  }
]

module.exports = WMS
