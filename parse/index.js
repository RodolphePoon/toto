const { parseTechnicalInfo, parseComments, parseLocation, parseUser, parseCarrousel, parseTaggerUsers } = require('./parseTechnicalInfo')

module.exports = {
  technical: {
    info: parseTechnicalInfo,
    comments: parseComments,
    location: parseLocation,
    user: parseUser,
    carrousel: parseCarrousel,
    taggedUsers: parseTaggerUsers
  },
  general: require('./parseGeneralInfo'),
  JSONFromHtml: require('./extractJSONFromHtml'),
  location: require('./parseLocationDetails'),
  metas: require('./parseMeta'),
  text: require('./parseText'),
  findMatch: require('./findMatch'),
  html: {
    post: require('./parsePostPageHtml'),
    location: require('./parseLocationPageHtml')
  }
}