const fs = require('fs')
const rp = require('request-promise');
const extractJSONFromHtml = require('./extractJSONFromHtml')
const parseGeneralInfo = require('./parseGeneralInfo')
const { parseTechnicalInfo } = require('./parseTechnicalInfo')

const createJSON = (fileName, json) => fs.writeFileSync(`${fileName}.json`, JSON.stringify(json, null, 2));

module.exports = async (postPageUrl, id = 'test') => {
  const html = await rp(postPageUrl)
  fs.writeFileSync(`${id}_raw.html`, html);
  const [generalInfo, technicalInfo] = extractJSONFromHtml(html)
  const parsedGeneralInfo = parseGeneralInfo(generalInfo)
  const parsedTechnicalInfo = parseTechnicalInfo(technicalInfo)
  createJSON(`${id}_raw`, { generalInfo, technicalInfo })
  return {
    generalInfo: parsedGeneralInfo, technicalInfo: parsedTechnicalInfo
  }
}