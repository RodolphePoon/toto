const isRecent = require('./isRecent')
const DAY = 24 * 60 * 60
module.exports = (post) => {


  const text = post.node.edge_media_to_caption.edges[0].node.text
  const mentions = text.match(/@([^@ \n\t\r])*/gi)
  const hashtags = text.match(/#([^# \n\t\r])*/gi)
  const recent = isRecent(post.node.taken_at_timestamp, 10 * DAY)

  return recent
}