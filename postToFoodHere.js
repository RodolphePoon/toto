const { uploadPost } = require('./initGraphql')
const data = require('./tagged_post_data_Thu_Feb_20_2020')

const format = (input) => {

  const { restaurantId, dishId, src, text, restaurant, email, phone, website, lat, lng, address, dish, value, devise = "", hashtags = [] } = input

  return {
    restaurant: {
      id: restaurantId,
      adress: address.trim(),
      lat: Number(lat),
      lon: Number(lng),
      provider: "foodhere",
      name: restaurant,
      email,
      phone,
      website,
    },
    dish: {

      id: dishId,
      customizable: false,
      devise: devise.toUpperCase(),
      name: dish,
      keywords: hashtags.filter(ht => !!ht).map((hashtag = '') => hashtag.replace('#', '')).concat([restaurant, dish]),
      price: Number(value),
      categories: ["TBD"],
      restaurantName: restaurant,
      options: [],
      allergies: [],
      section: "TBD",
      restaurantId: restaurantId
    },
    post: {
      img_url: src,
      text: text,
    }, liked: true, disliked: false
  }
}

const getRestaurantId = async ({ lat, lng, restaurant }) => {
  console.log(`[getRestaurantId] Trying to find restaurantId base on restaurant name and location`)

  //get restaurant by lat lng
  //find restaurantId by dish name  calc pertinance

  return null
}

const getDishId = async (restaurantId, { dish }) => {
  console.log(`[getRestaurantId] Trying to find restaurantId base on restaurantId name and dish`)

  //get dish by restaurant id
  //find dishId by dish name  calc pertinance

  return null

}






const postBatch = async (data = []) => {
  let newRestaurantCount = 0, newDishCount = 0
  data.forEach(async (input) => {
    const restaurantId = await getRestaurantId(input)

    let dishId
    if (restaurantId) {
      dishId = await getDishId(restaurantId, input)
    } else {
      newRestaurantCount++

    }

    if (!dishId) {
      newDishCount++
    }
    await uploadPost(format(Object.assign({}, input, { restaurantId, dishId }))).catch((err) => console.log(`[uploadPost] there is an error when uploading post ${JSON.stringify(err, null, 2)}`))
  })
  return { newRestaurantCount, newDishCount }
}

module.exports = postBatch


