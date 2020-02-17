const rp = require('request-promise');
const JSONFromHtml = require('./extractJSONFromHtml')
const parseLocationMeta = require('./parseMeta')
const parseLocationInfo = require('./parseLocationDetails')
const createHtml = require('../utils/createHtml')
const createJSON = require('../utils/createJSON')
const fs = require('fs')

module.exports = async (url, test, id = "test") => {
  console.log(`[parse location page html] ${url}`)
  let detailedInfo, generalInfo
  const html = await rp(url)

  const [locationInfo] = JSONFromHtml(html)
  if (locationInfo) {
    detailedInfo = parseLocationInfo(locationInfo)
  }
  if (html) {
    generalInfo = parseLocationMeta(html)
  }

  if (test) {
    createHtml(id, html)
    createJSON(id + '_location_raw', locationInfo)
    createJSON(id + '_location_parsed', { detailedInfo, generalInfo })

  }
  return { generalInfo, detailedInfo }
}
