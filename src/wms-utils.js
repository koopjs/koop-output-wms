const util = require('util')

/**
 * Normalize and range check input dimensions
 * @param {*} inWidth
 * @param {*} inHeight
 * @returns {object} object with error, width, height
 */
function normalizeDimensions (inWidth, inHeight) {
  let width = (inWidth === undefined) ? 256 : parseInt(inWidth)
  let height = (inHeight === undefined) ? 256 : parseInt(inHeight)
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || width > 2048 || height < 1 || height > 2048) {
    let err = new Error('Invalid size: ' + inWidth + '×' + inHeight)
    err.code = 400
    return { err }
  }
  return { err: null, width, height }
}

function normalizeBbox (bboxStr, errCallback = () => {}) {
  const bboxStrArr = bboxStr ? bboxStr.split(',') : []
  if (bboxStrArr.length !== 4) {
    let err = new Error('Invalid bbox: ' + util.inspect(bboxStrArr))
    err.code = 400
    return { err }
  }
  const bbox = bboxStrArr.map(parseFloat)
  if (bbox.some(isNaN)) {
    let err = new Error('Invalid bbox: ' + util.inspect(bbox))
    err.code = 400
    return { err }
  }

  return { err: null, bbox }
}

/**
 * Test if input data is a PNG
 * @param {Uint8Array} data
 * @returns {boolean}
 */
function isPng (data) {
  return data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E &&
  data[3] === 0x47 && data[4] === 0x0D && data[5] === 0x0A &&
  data[6] === 0x1A && data[7] === 0x0A
}

module.exports = { normalizeDimensions, normalizeBbox, isPng }
