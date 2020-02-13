const _ = require('lodash')
const $ = require('cheerio');

module.exports = (html) => {
  const res = []
  _.chain($('script', html)).forEach(({ children, attribs }) => {
    if (!attribs.src) {
      try {
        let data = _.get(children, [0, 'data'], '')
        if (data.startsWith("window._sharedData")) {
          const { entry_data } = JSON.parse(data.replace(/window._sharedData =|;/g, ''))
          res.push(entry_data)
        } else {
          const json = JSON.parse(data)
          res.push(json)
        }
      } catch (e) {
      }
    }
  }).value()

  return res
}