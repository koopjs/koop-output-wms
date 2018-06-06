const test = require('tape')
const { normalizeDimensions, normalizeBbox, isPng } = require('../src/wms-utils')

test('normalizeDimensions - in-range integer input', t => {
  t.plan(3)
  const inWidth = 512
  const inHeight = 512
  const { err, width, height } = normalizeDimensions(inWidth, inHeight)
  t.equal(err, null)
  t.equal(width, 512)
  t.equal(height, 512)
})

test('normalizeDimensions - undefined input', t => {
  t.plan(3)
  const { err, width, height } = normalizeDimensions(undefined, undefined)
  t.equal(err, null)
  t.equal(width, 256)
  t.equal(height, 256)
})

test('normalizeDimensions - string input', t => {
  t.plan(3)
  const inWidth = '512'
  const inHeight = '512'
  const { err, width, height } = normalizeDimensions(inWidth, inHeight)
  t.equal(err, null)
  t.equal(width, 512)
  t.equal(height, 512)
})

test('normalizeDimensions - out of range width', t => {
  t.plan(2)
  const inWidth = 0
  const inHeight = 256
  const { err } = normalizeDimensions(inWidth, inHeight)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('normalizeDimensions - out of range width', t => {
  t.plan(2)
  const inWidth = 2049
  const inHeight = 256
  const { err } = normalizeDimensions(inWidth, inHeight)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('normalizeDimensions - out of range height', t => {
  t.plan(2)
  const inWidth = 256
  const inHeight = 0
  const { err } = normalizeDimensions(inWidth, inHeight)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('normalizeDimensions - out of range height', t => {
  t.plan(2)
  const inWidth = 256
  const inHeight = 2049
  const { err } = normalizeDimensions(inWidth, inHeight)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('normalizeDimensions - invalid string width input', t => {
  t.plan(2)
  const inWidth = '256'
  const inHeight = 'test'
  const { err } = normalizeDimensions(inWidth, inHeight)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('normalizeDimensions - invalid string height input', t => {
  t.plan(2)
  const inWidth = 'test'
  const inHeight = '256'
  const { err } = normalizeDimensions(inWidth, inHeight)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('normalizeBbox - valid input string', t => {
  t.plan(2)
  const inBbox = '5009377,10018754,10018754,15028131'
  const { err, bbox } = normalizeBbox(inBbox)
  t.equal(err, null)
  t.deepEqual(bbox, [5009377, 10018754, 10018754, 15028131])
})

test('normalizeBbox - invalid input string', t => {
  t.plan(2)
  const inBbox = '5009377,10018754,10018754'
  const { err } = normalizeBbox(inBbox)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('normalizeBbox - invalid input string', t => {
  t.plan(2)
  const inBbox = '5009377,10018754,string,15028131'
  const { err } = normalizeBbox(inBbox)
  t.equal(err instanceof Error, true)
  t.equal(err.code, 400)
})

test('isPNG - valid input PNG', t => {
  t.plan(1)
  const inPng = new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,1,0,0,0,1,0,8,6,0,0,0,92,114,168,102,0,0,4,144,73,68,65,84,120,1,237,208,49,1,0,0,0,194,160,245,79,237,107,8,136,64,97,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,96,192,128,1,3,6,12,24,48,240,3,3,1,60,0,1,26,186,64,83,0,0,0,0,73,69,78,68,174,66,96,130]) // eslint-disable-line
  const result = isPng(inPng)
  t.equal(result, true)
})

test('isPNG - invalid input PNG', t => {
  t.plan(1)
  const inPng = new Uint8Array([])
  const result = isPng(inPng)
  t.equal(result, false)
})
