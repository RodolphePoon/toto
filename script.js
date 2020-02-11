const fetchPosts = require('./fetchPosts')
const createUrl = require('./createInstagramGraphqlQueryUrl')
const processPost = require('./processPost')
const shouldProcess = require('./shouldProcess')
const { query_hash, variables } = require("./config.json")

async function run() {
  let has_next_page = true
  let end_cursor
  let counter = 0, fetchCounter = 0

  while (has_next_page) {
    const url = createUrl(query_hash, Object.assign({}, variables, { after: end_cursor }))
    const response = await fetchPosts(url)
    fetchCounter++
    end_cursor = response.end_cursor
    has_next_page = response.has_next_page
    for (const post of response.edges) {
      if (shouldProcess(post)) {
        await processPost(post)
        counter++
      }
    }
  }
}

run()