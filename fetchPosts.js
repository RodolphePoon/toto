const fetch = require('node-fetch')
const isRecent = require('./isRecent')
const data = require('./ddd.json')




module.exports = async (url) => {
  //const { data } = await fetch(url).then(res => res.json())
  const { edges, page_info, count } = data.user.edge_user_to_photos_of_you
  const { has_next_page, end_cursor } = page_info
  const earliestTimeStamp = edges[count - 1].node.taken_at_timestamp

  return { edges, has_next_page: has_next_page && isRecent(earliestTimeStamp), end_cursor }
}