const isRecent = require('./isRecent')
const parse = require('../parse')
const DAY = 24 * 60 * 60
module.exports = (post) => {


  const text = post.node.edge_media_to_caption.edges[0].node.text
  const { mentions, hashtags } = parse.text(text)
  const recent = isRecent(post.node.taken_at_timestamp, 20 * DAY)

  return recent
}