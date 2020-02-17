const _ = require('lodash')
const parseText = require('./parseText')
module.exports = (info) => {

  const { author = {}, comment = [], contentLocation = {}, interactionStatistic, mainEntityofPage, uploadDate, commentCount, description, name, caption } = info
  const { mentions, hashtags, adress, restaurant, dish, price, value, devise } = parseText(caption)
  const { streetAddress, addressLocality, addressCountry } = _.get(contentLocation, 'address', {})
  return {
    user: {
      name: _.get(author, 'alternateName'),
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
      name: _.get(contentLocation, 'name'),
      url: _.get(contentLocation, 'mainEntityofPage.@id'),
      adress: streetAddress,
      locality: addressLocality,
      country: _.get(addressCountry, 'name'),
      detailedAddress: `${streetAddress}, ${addressLocality}, ${_.get(addressCountry, 'name')}`
    },
    likeCount: _.get(interactionStatistic, 'userInteractionCount'),
    url: _.get(mainEntityofPage, '@id'),
    uploadDate, commentCount, description, name, caption, mentions, hashtags, adress, restaurant, dish, price, value, devise, timestamp: Date.parse(uploadDate)
  }
}