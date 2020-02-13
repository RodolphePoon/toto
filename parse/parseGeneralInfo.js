const _ = require('lodash')
const parseText = require('./parseText')
module.exports = (info) => {

  const { author, comment, contentLocation = {}, interactionStatistic, mainEntityofPage, uploadDate, commentCount, description, name, caption } = info
  const { mentions, hashtags, adress, restaurant, dish, price, value, devise } = parseText(caption)
  return {
    user: {
      name: author.alternateName,
      url: _.get(author, 'mainEntityofPage.@id')
    },
    comments: comment.map(({ text, author = {} }) => {
      const { mentions, hashtags } = parseText(text)
      return {
        text, mentions, hashtags,
        user: {
          name: author.alternateName,
          url: _.get(author, 'mainEntityofPage.@id')
        },
      }
    }),
    location: {
      name: contentLocation.name,
      url: _.get(contentLocation, 'mainEntityofPage.@id'),
      adress: _.get(contentLocation, 'address.streetAddress'),
      locality: _.get(contentLocation, 'address.addressLocality'),
      country: _.get(contentLocation, 'address.addressCountry.name')
    },
    likeCount: _.get(interactionStatistic, 'userInteractionCount'),
    url: _.get(mainEntityofPage, '@id'),
    uploadDate, commentCount, description, name, caption, mentions, hashtags, adress, restaurant, dish, price, value, devise, timestamp: Date.parse(uploadDate)
  }
}