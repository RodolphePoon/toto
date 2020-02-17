const _ = require('lodash')
const parseText = require('./parseText')
const parseTechnicalInfo = ({ PostPage }) => {
  if (!PostPage) {
    return
  }
  const {
    id,
    shortcode,
    dimensions,
    display_url,
    display_resources,
    is_video,
    edge_media_to_tagged_user = {}, edge_media_to_caption,
    caption_is_edited, edge_media_to_parent_comment = {},
    taken_at_timestamp, edge_media_preview_like, location, owner, is_ad,
    edge_sidecar_to_children = {}

  } = _.get(PostPage, [0, 'graphql', 'shortcode_media'], {})
  const { mentions, hashtags } = parseText(_.get(edge_media_to_caption, 'edges[0].node.text', ''))

  return {
    id,
    shortcode,
    dimensions,
    src: display_url,
    srcs: display_resources,
    isVideo: is_video,
    taggedUsers: parseTaggerUsers(edge_media_to_tagged_user),
    caption: _.get(edge_media_to_caption, 'edges[0].node.text', ''),
    mentions, hashtags,
    isEdited: caption_is_edited,
    commentCount: _.get(edge_media_to_parent_comment, 'count', 0),
    comments: parseComments(edge_media_to_parent_comment),
    timestamp: taken_at_timestamp,
    likeCount: _.get(edge_media_preview_like, 'count', 0),
    location: parseLocation(location),
    user: parseUser(owner),
    isAd: is_ad,
    carrousel: parseCarrousel(edge_sidecar_to_children)
  }
}
const parseTaggerUsers = ({ edges = [] }) => edges.map(({ node = {} }) => {
  const { user = {}, x, y } = node
  const { id, full_name, profile_pic_url, username, is_verified } = user
  return {
    display_name: full_name,
    id,
    src: profile_pic_url,
    username,
    isVerified: is_verified,
    position: {
      x, y
    }
  }
})
const parseCarrousel = ({ edges = [] }) => edges.map(({ node = {} }) => {
  const {
    id,
    shortcode,
    dimensions,
    display_url,
    display_resources,
    accessibility_caption,
    is_video,
    edge_media_to_tagged_user = {}
  } = node
  return {
    id,
    shortcode,
    dimensions,
    src: display_url,
    srcs: display_resources,
    caption: accessibility_caption,
    isVideo: is_video,
    taggedUsers: parseTaggerUsers(edge_media_to_tagged_user)
  }
})


const parseUser = ({ id, is_verified, profile_pic_url, username, full_name, is_private }) => {
  return {
    id,
    isVerified: is_verified,
    src: profile_pic_url,
    username,
    display_name: full_name,
    isPrivate: is_private
  }
}
const parseLocation = (location) => {
  const { id, name, slug, address_json } = location
  const { street_address, zip_code, city_name, region_name, country_code } = JSON.parse(address_json)
  const url = `https://www.instagram.com/explore/locations/${id}/${slug}/`
  return {
    id, name, slug, url, address: street_address, zipCode: zip_code, locality: city_name, region: region_name, country: country_code,
    detailedAddress: `${street_address},${city_name}, ${zip_code}, ${region_name}, ${country_code} `,
  }
}
const parseComments = ({ edges = [] }) => edges.map(({ node }) => {
  const { id, text, created_at, owner, edge_liked_by, edge_threaded_comments = {} } = node
  const { id: userId, is_verified, profile_pic_url, username } = owner
  const { mentions, hashtags } = parseText(text)

  return ({
    id, text,
    timestamp: created_at,
    user: {
      id: userId,
      username,
      isVerified: is_verified,
      src: profile_pic_url,
    },
    likeCount: edge_liked_by.count,
    comments: parseComments(edge_threaded_comments),
    mentions, hashtags
  })

})
module.exports = {
  parseTechnicalInfo, parseComments, parseLocation, parseUser, parseCarrousel, parseTaggerUsers
}