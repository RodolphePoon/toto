const fetchPosts = require('./fetchTaggedPosts')
const { createUrl, shouldProcess, createJSON } = require('./utils')
const processPost = require('./processPost')
const { query_hash, variables } = require("./config.json")

async function run() {
  let has_next_page = true
  let end_cursor
  let counter = 0

  const posts = []

  while (has_next_page) {
    const url = createUrl(query_hash, Object.assign({}, variables, { after: end_cursor }))
    console.log(url)
    const response = await fetchPosts(url)
    end_cursor = response.end_cursor
    has_next_page = response.has_next_page
    for (const post of response.edges) {
      if (shouldProcess(post)) {
        const { data, isGood } = await processPost(post)
        if (isGood) {
          console.log({ data })
          posts.push(data)
        }
        counter++
      }
    }
  }

  console.log(`processed ${counter} posts`)

  const fileName = "tagged_post_data_" + new Date().toDateString().replace(/ /g, '_')

  createJSON(fileName, posts)

}

run()