const mapnik = require('mapnik')
mapnik.register_default_input_plugins()
const mapnikify = require('@mapbox/geojson-mapnikify')
const { normalizeDimension, normalizeBbox } = require('./wms-utils')
/**
 * Render a mapnik image tile from geojson
 * @param {object} wmsQueryParams WMS parameters from request
 * @param {object} geojson geojson data to be rendered
 * @param {function} callback post-rendering callback
 * @param {object} options
 */
function render (wmsQueryParams, geojson, callback, options = {}) {
  // Normalize the WMS dimensions
  const width = normalizeDimension(wmsQueryParams.width)
  if (width.err) return callback(width.err)
  const height = normalizeDimension(wmsQueryParams.height)
  if (height.err) return callback(height.err)
  // Normalize the WMS Bbox
  const bbox = normalizeBbox(wmsQueryParams.bbox)
  if (bbox.err) return callback(bbox.err)

  // Convert GeoJSON to Mapnik XML
  mapnikify(geojson, false, function (err, xml) {
    if (err) return callback(err)
    var map = new mapnik.Map(256, 256)

    // Create map from XML string
    map.fromString(xml, function (err, map) {
      if (err) return callback(err)
      // Configure and render
      map.resize(width.size, height.size)
      if (wmsQueryParams.SRS) map.srs = `+init=${wmsQueryParams.srs}`
      map.extent = bbox.coordinates
      var canvas = new mapnik.Image(width.size, height.size)
      map.render(canvas, function (err, image) {
        if (err) return callback(err)
        if (options.palette) return image.encode('png8:z=1', {palette: options.palette}, callback)
        image.encode('png32:z=1', callback)
      })
    })
  })
}

module.exports = render
