const test = require('tape')
const pointFixture = require('./fixtures/point.json')
const { isPng } = require('../src/wms-utils')
const { getMap } = require('../src/operations')

test('getMap - valid input', t => {
  t.plan(4)
  // Test parameters
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

  // Mock Response Object
  function ResMock () {
    let headers = []
    this.status = (_code) => {
      t.equal(_code, 200)
      return this
    }
    this.set = (key, value) => {
      headers.push({[key]: value})
      if (headers.length === 1) {
        t.deepEqual(headers[0], {'Content-Length': 1225})
      } else if (headers.length === 2) {
        t.deepEqual(headers[1], {'Content-Type': 'image/png'})
      }
      return this
    }
    this.send = (_tile) => {
      t.equals(isPng(_tile), true)
    }
  }
  const resMock = new ResMock()
  getMap(wmsQueryParams, pointFixture, resMock)
})
