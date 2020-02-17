const rp = require('request-promise');
const extractJSONFromHtml = require('./extractJSONFromHtml')
const parseGeneralInfo = require('./parseGeneralInfo')
const { parseTechnicalInfo } = require('./parseTechnicalInfo')
const createHTML = require('../utils/createHtml')
const createJSON = require('../utils/createJSON')


module.exports = async (postPageUrl, test, id = 'test') => {
  console.log(`[parse post page html] ${postPageUrl}`)

  let parsedGeneralInfo, parsedTechnicalInfo
  const html = await rp(postPageUrl)
  const json = extractJSONFromHtml(html)
  json.reverse()
  const [technicalInfo, generalInfo] = json

  if (generalInfo) {
    parsedGeneralInfo = parseGeneralInfo(generalInfo)
  }
  if (technicalInfo) {
    parsedTechnicalInfo = parseTechnicalInfo(technicalInfo)
  }
  if (test) {
    createHTML(id, html)
    createJSON(id + '_raw', { generalInfo, technicalInfo })

    createJSON(id, { parsedGeneralInfo, parsedTechnicalInfo })
  }
  return {
    generalInfo: parsedGeneralInfo, technicalInfo: parsedTechnicalInfo
  }
}