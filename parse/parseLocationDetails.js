const _ = require('lodash')
const parseText = require('./parseText')


const parsePost = ({ node }) => {
  const { id, edge_media_to_caption, shortcode, edge_media_to_comment, taken_at_timestamp, dimensions, display_url, edge_liked_by, is_video } = node

  const caption = _.get(edge_media_to_caption, 'edges.0.node.text', '')
  const { mentions, hashtags } = parseText(caption)
  return {
    id,
    shortcode,
    caption, mentions, hashtags,
    commentCount: _.get(edge_media_to_comment, 'count', 0),
    timestamp: taken_at_timestamp,
    uploadDate: Date(taken_at_timestamp).toString(),
    dimensions,
    url: display_url,
    likeCount: _.get(edge_liked_by, 'count', 0),
    isVideo: is_video,
  }
}

module.exports = ({ LocationsPage }) => {
  const { id, name, has_public_page, lat, lng, slug, blurb, website, phone, primary_alias_on_fb,
    address_json, profile_pic_url, edge_location_to_media, edge_location_to_top_posts, directory
  } = _.get(LocationsPage, '0.graphql.location')
  const { street_address, zip_code, city_name, region_name, country_code, } = JSON.parse(address_json)
  const recentPosts = _.chain(edge_location_to_media).get('edges', []).map(parsePost).value()
  const bestPosts = _.chain(edge_location_to_top_posts).get('edges', []).map(parsePost).value()
  const posts = bestPosts.concat(recentPosts)
  const postUrls = posts.map(({ url }) => url)
  return {
    id, name, hasPublicPage: has_public_page, lat, lng,
    latlng: {
      lat, lng,
    },
    location: {
      address: street_address,
      locality: city_name,
      zipCode: zip_code,
      region: region_name,
      country: country_code,
      detailedAddress: `${street_address}, ${city_name}, ${zip_code}, ${region_name}, ${country_code}`,
    },
    slug, description: blurb, website, phone, fbName: primary_alias_on_fb, src: profile_pic_url,
    postsCount: _.get(edge_location_to_media, 'count'),
    posts, bestPosts,
    recentPosts,
    directory,
    postUrls
  }
}