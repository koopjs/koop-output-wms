const test = require('tape')
const pointFixture = require('./fixtures/point.json')
const { isPng } = require('../src/wms-utils')
const render = require('../src/render')

test('render - valid input', t => {
  t.plan(2)
  const wmsQueryParams = {
    SERVICE: 'WMS',
    REQUEST: 'GetMap',
    VERSION: '1.1.1',
    LAYERS: '__all__',
    STYLES: null,
    FORMAT: 'image/png',
    TRANSPARENT: 'true',
    HEIGHT: '256',
    WIDTH: '256',
    DETECTRETINA: 'true',
    SRS: 'EPSG:3857',
    BBOX: '5009377.085697311,10018754.171394618,10018754.171394622,15028131.25709193'
  }
  render(wmsQueryParams, pointFixture, (err, tile) => {
    t.equal(err, null)
    t.equal(isPng(tile), true)
  })
})

test('render - invalid query param ', t => {
  t.plan(2)
  const wmsQueryParams = {
    SERVICE: 'WMS',
    REQUEST: 'GetMap',
    VERSION: '1.1.1',
    LAYERS: '__all__',
    STYLES: null,
    FORMAT: 'image/png',
    TRANSPARENT: 'true',
    HEIGHT: 'test',
    WIDTH: '256',
    DETECTRETINA: 'true',
    SRS: 'EPSG:3857',
    BBOX: '5009377.085697311,10018754.171394618,10018754.171394622,15028131.25709193'
  }
  render(wmsQueryParams, pointFixture, (err, tile) => {
    t.equal(err instanceof Error, true)
    t.equal(err.code, 400)
  })
})
