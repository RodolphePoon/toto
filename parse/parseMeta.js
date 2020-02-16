const _ = require('lodash')
const $ = require('cheerio')

module.exports = (html) => {
  const metas = {}
  _.chain($('meta', html)).forEach(({ attribs }) => {
    const { property, content } = attribs
    if (property) {
      const parsedProperty = property.split(':').pop()
      metas[parsedProperty] = content
    }
  }).value()
  return metas
}