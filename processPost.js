const parse = require('./parse')
const { createJSON } = require('./utils')
const _ = require('lodash')

module.exports = async (post) => {
  const img_url = post.node.display_url
  const postId = post.node.shortcode
  const text = post.node.edge_media_to_caption.edges[0].node.text
  const textInfo = parse.text(text)
  const detail = await parse.html.post(`https://www.instagram.com/p/${postId}/`, postId)
  const locationUrl = _.get(detail, 'generalInfo.location.url') || _.get(detail, 'technicalInfo.location.url')
  let locationInfo
  if (locationUrl) {
    locationInfo = await parse.html.location(locationUrl).catch(err => null)
  } else {
    return { isGood: false }
  }
  const { hashtags, dish, value, devise, restaurant } = textInfo

  const lat = _.get(locationInfo, 'detailedInfo.lat') || _.get(locationInfo, 'generalInfo.latitude')
  const lng = _.get(locationInfo, 'detailedInfo.lng') || _.get(locationInfo, 'generalInfo.longitude')
  const restaurantName = restaurant || _.get(locationInfo, 'generalInfo.title', '').replace(' on Instagram • Photos and Videos', '') || _.get(locationInfo, 'detailedInfo.name') || _.get(detail, 'generalInfo.location.name') || _.get(detail, 'technicalInfo.location.name')
  const address = _.get(detail, 'generalInfo.location.detailedAddress') || _.get(detail, 'technicalInfo.location.detailedAddress') || _.get(locationInfo, 'detailedInfo.location.detailedAddress')


  const isGood = dish && address && restaurantName && lat && lng

  createJSON(`${postId}_parsed`, {
    preview: {
      img_url,
      postId,
      text,
      textInfo
    },
    detail,
    locationInfo
  })

  return {
    data: {
      text,
      restaurant,
      lat,
      lng,
      address,
      dish,
      value, devise,
      hashtags
    }, isGood
  }
}