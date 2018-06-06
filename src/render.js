const mapnik = require('mapnik')
mapnik.register_default_input_plugins()
const mapnikify = require('@mapbox/geojson-mapnikify')
const { normalizeDimensions, normalizeBbox } = require('./wms-utils')
/**
 * Render a mapnik image tile from geojson
 * @param {object} wmsQueryParams WMS parameters from request
 * @param {object} geojson geojson data to be rendered
 * @param {function} callback post-rendering callback
 * @param {object} options
 */
function render (wmsQueryParams, geojson, callback, options = {}) {
  // Normalize the WMS dimensions
  const dimensions = normalizeDimensions(wmsQueryParams.WIDTH, wmsQueryParams.HEIGHT)
  if (dimensions.err) return callback(dimensions.err)

  // Normalize the WMS Bbox
  const bbox = normalizeBbox(wmsQueryParams.BBOX)
  if (bbox.err) return callback(bbox.err)

  // Convert GeoJSON to Mapnik XML
  mapnikify(geojson, false, function (err, xml) {
    if (err) return callback(err)
    var map = new mapnik.Map(256, 256)

    // Create map from XML string
    map.fromString(xml, function (err, map) {
      if (err) return callback(err)
      // Configure and render
      map.resize(dimensions.width, dimensions.height)
      if (wmsQueryParams.SRS) map.srs = `+init=${wmsQueryParams.SRS}`
      map.extent = bbox.bbox
      var canvas = new mapnik.Image(dimensions.width, dimensions.height)
      map.render(canvas, function (err, image) {
        if (err) return callback(err)
        if (options.palette) return image.encode('png8:z=1', {palette: options.palette}, callback)
        image.encode('png32:z=1', callback)
      })
    })
  })
}

module.exports = render
