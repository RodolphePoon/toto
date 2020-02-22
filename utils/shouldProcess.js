const isRecent = require('./isRecent')
const parse = require('../parse')
const { dayLimits } = require('../config.json')

module.exports = (post) => {

  const text = post.node.edge_media_to_caption.edges[0].node.text
  const { mentions, hashtags, dish, restaurant } = parse.text(text)
  const recent = isRecent(post.node.taken_at_timestamp, dayLimits)

  return recent && dish && restaurant && mentions.includes("@foodhere.fr") && hashtags.includes("#foodhere")
}