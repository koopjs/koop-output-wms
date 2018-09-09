const test = require('tape')
const { normailizeQueryParams } = require('../src/utils')

test('parseQueryParams', t => {
  t.plan(2)
  const params = {
    REQUEST: 'GetMap'
  }
  const result = normailizeQueryParams(params)
  t.equal(result.hasOwnProperty('request'), true)
  t.equal(result.hasOwnProperty('REQUEST'), false)
})
