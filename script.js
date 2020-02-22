const fetchPosts = require('./fetchTaggedPosts')
const { createUrl, shouldProcess, createJSON } = require('./utils')
const processPost = require('./processPost')
const { query_hash, variables, test, password, username } = require("./config.json")
const postBatch = require('./postToFoodHere')
const { init } = require('./initGraphql')

async function run() {
  await init(username, password)

  let has_next_page = true
  let end_cursor
  let counter = 0

  const posts = []


  while (has_next_page) {
    const url = createUrl(query_hash, Object.assign({}, variables, { after: end_cursor }))
    console.log(`[run] CREATED url : ${url}`)
    const response = await fetchPosts(url)
    end_cursor = response.end_cursor
    has_next_page = response.has_next_page
    for (const post of response.edges) {
      console.log(`[run] Checking : https://www.instagram.com/p/${post.node.shortcode}/`)
      if (shouldProcess(post)) {
        console.log(`[run] This Post will be processed: https://www.instagram.com/p/${post.node.shortcode}/`)

        const { data, isGood } = await processPost(post, test)
        if (isGood) {
          console.log(`[run] processed post ${post.node.shortcode} is valuable Post, adding to our post array`)
          posts.push(data)
        }
        counter++
      }
    }
  }


  console.log(`[run] PROCESSED ${counter} posts`)

  const fileName = "tagged_post_data_" + new Date().toDateString().replace(/ /g, '_')

  createJSON(fileName, posts)

  console.log(`[run] STARTING Posting on FoodHere ${counter} posts`)

  try {
    await postBatch(posts)
    console.log(`[run] SCRIPT END: Everything went well, there is ${posts.length} posts added to FoodHere
    `)
  } catch (err) {
    console.err(`[run] There is a problem when trying to post on FoodHere`, err)
  }
}

console.log('[run] SCRIPT STARTING')
run().then(() => {
  console.log(`[run] SCRIPT END`)
})
