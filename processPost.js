const isRecent = require('./isRecent')
const findMatch = require('./findMatch')
const fetch = require('node-fetch')
module.exports = async (post) => {
  console.log(JSON.stringify(post, null, 2))





  const img_url = post.node.display_url
  const postId = post.node.shortcode
  const text = post.node.edge_media_to_caption.edges[0].node.text
  const mentions = text.match(/@([^@ \n\t\r])*/gi)
  const hashtags = text.match(/#([^# \n\t\r])*/gi)
  const adress = findMatch(text, '📍', '\n\t\r')
  const restaurant = findMatch(text, '🏠', '\n\t\r')
  const dish = findMatch(text, '🍽️', '\n\t\r')
  const price = findMatch(text, '💵', '\n\t\r')
  const value = price.match(/\d+/g)[0] || 0
  const devise = price.match(/\D/gi)[0] || null

  const response = await fetch(`https://www.instagram.com/p/${postId}/`)
  console.log({
    img_url,
    postId,
    text, mentions, hashtags, restaurant, adress, dish, price, value, devise
  })

  console.log(JSON.stringify(response, null, 2))










}