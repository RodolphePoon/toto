const rp = require('request-promise');
const extractJSONFromHtml = require('./extractJSONFromHtml')
const parseGeneralInfo = require('./parseGeneralInfo')
const { parseTechnicalInfo } = require('./parseTechnicalInfo')

module.exports = async (postPageUrl, id = 'test') => {
  console.log({ postPageUrl })
  const html = await rp(postPageUrl)
  const [generalInfo, technicalInfo] = extractJSONFromHtml(html)
  const parsedGeneralInfo = parseGeneralInfo(generalInfo)
  const parsedTechnicalInfo = parseTechnicalInfo(technicalInfo)
  return {
    generalInfo: parsedGeneralInfo, technicalInfo: parsedTechnicalInfo
  }
}