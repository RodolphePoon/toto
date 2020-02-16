const rp = require('request-promise');
const JSONFromHtml = require('./extractJSONFromHtml')
const parseLocationMeta = require('./parseMeta')
const parseLocationInfo = require('./parseLocationDetails')
const createHtml = require('../utils/createHtml')
const createJSON = require('../utils/createJSON')
const fs = require('fs')

module.exports = async (url) => {
  console.log({ locationUrl: url })

  const html = await rp(url).catch(err => {

    fs.createWriteStream('flflflf.txt', JSON.stringify(err))

    return {}
  })
  createHtml('location', html)

  /*
  const [locationInfo] = JSONFromHtml(html)
  createJSON('location', locationInfo)
  const detailedInfo = parseLocationInfo(locationInfo)
  const generalInfo = parseLocationMeta(html)

  return { generalInfo, detailedInfo }*/
}
