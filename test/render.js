const test = require('tape')
const pointFixture = require('./fixtures/point.json')
const { isPng } = require('../src/wms-utils')
const render = require('../src/render')

test('render - valid input', t => {
  t.plan(2)
  const wmsQueryParams = {
    service: 'WMS',
    request: 'GetMap',
    version: '1.1.1',
    layers: '__all__',
    styles: null,
    format: 'image/png',
    transparent: 'true',
    height: '256',
    width: '256',
    detectretina: 'true',
    srs: 'EPSG:3857',
    bbox: '5009377.085697311,10018754.171394618,10018754.171394622,15028131.25709193'
  }
  render(wmsQueryParams, pointFixture, (err, tile) => {
    t.equal(err, null)
    t.equal(isPng(tile), true)
  })
})

test('render - invalid query param ', t => {
  t.plan(2)
  const wmsQueryParams = {
    service: 'WMS',
    request: 'GetMap',
    version: '1.1.1',
    layers: '__all__',
    styles: null,
    format: 'image/png',
    transparent: 'true',
    height: 'test',
    width: '256',
    detectretina: 'true',
    srs: 'EPSG:3857',
    bbox: '5009377.085697311,10018754.171394618,10018754.171394622,15028131.25709193'
  }
  render(wmsQueryParams, pointFixture, (err, tile) => {
    t.equal(err instanceof Error, true)
    t.equal(err.code, 400)
  })
})
