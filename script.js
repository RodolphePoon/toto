const fetchPosts = require('./fetchTaggedPosts')
const { createUrl, shouldProcess } = require('./utils')
const processPost = require('./processPost')
const { query_hash, variables } = require("./config.json")

async function run() {
  let has_next_page = true
  let end_cursor
  let counter = 0

  while (has_next_page) {
    const url = createUrl(query_hash, Object.assign({}, variables, { after: end_cursor }))
    console.log(url)
    const response = await fetchPosts(url)
    end_cursor = response.end_cursor
    has_next_page = response.has_next_page
    for (const post of response.edges) {
      if (shouldProcess(post)) {
        await processPost(post)
        counter++
      }
    }
  }

  console.log(`processed ${counter} posts`)
}

run()