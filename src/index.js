const requestHandler = require('./request-handler')

function WMS () {}

WMS.prototype.serve = requestHandler

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
