const { isRecent } = require('./utils')
const _ = require('lodash')
const rp = require('request-promise');
const { dayLimits } = require('./config.json')


module.exports = async (url) => {
  const { data } = await rp(url).then(res => JSON.parse(res))
  const { edges, page_info, count } = data.user.edge_user_to_photos_of_you
  const { has_next_page, end_cursor } = page_info
  const earliestTimeStamp = _.get(edges, `${count - 1}.node.taken_at_timestamp`)

  return { edges, has_next_page: has_next_page && isRecent(earliestTimeStamp, dayLimits), end_cursor }
}