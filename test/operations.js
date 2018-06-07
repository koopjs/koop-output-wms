const test = require('tape')
const pointFixture = require('./fixtures/point.json')
const { isPng } = require('../src/wms-utils')
const { getMap } = require('../src/operations')

test('getMap - valid input', t => {
  t.plan(4)
  // Test parameters
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

  // Mock Response Object 
  function ResMock () {
    let headers = []
    this.status = (_code) => {
      t.equal(_code, 200)
      return this
    },
    this.set = (key, value) => {
      headers.push({[key]: value})
      if (headers.length === 1) {
        t.deepEqual(headers[0], {'Content-Length': 1225})
      } else if (headers.length === 2) {
        t.deepEqual(headers[1], {'Content-Type': 'image/png'})
      }
      return this
    },
    this.send = (_tile) => {
      t.equals(isPng(_tile), true)
    }
  }
  const resMock = new ResMock()
  getMap(wmsQueryParams, pointFixture, resMock)
})
