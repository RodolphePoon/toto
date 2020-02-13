const parse = require('./parse')
const createJSON = require('./createJSON')

module.exports = async (post) => {
  const img_url = post.node.display_url
  const postId = post.node.shortcode
  const text = post.node.edge_media_to_caption.edges[0].node.text
  const textInfo = parse.text(text)
  const detail = await parse.html.post(`https://www.instagram.com/p/${postId}/`, postId)

  createJSON(`${postId}_parsed`, {
    preview: {
      img_url,
      postId,
      text,
      textInfo
    },
    detail
  })
}