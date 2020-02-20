const { helloWorld, uploadPost } = require('./initGraphql')



const format = ({ restaurantId, dishId, src, text, restaurant, email, phone, website, lat, lng, address, dish, value, devise, hashtags }) => ({
  restaurant: {
    id: restaurantId,
    adress: address,
    lat: Number(lat),
    lon: Number(lng),
    provider: "foodhere",
    name: restaurant,
    email: email,
    phone: phone,
    website: website,

  },
  dish: {
    id: dishId,
    customizable: false,
    devise: devise.toUppercase(),
    name: dish,
    keywords: hashtags.concat([restaurant, dish]),
    price: Number(value),
    restaurantName: restaurant,
    section: "TBD",
    restaurantId: restaurantId
  },
  post: {
    img_url: src,
    text: text,
    options: []
  }, liked: true, disliked: false
})





const postBatch = async (data) => {
  try {
    await init()
    data.map(async (input) => {
      const res = await uploadPost(format(input))
      console.log(JSON.stringify(res, null, 2))
    })

  } catch (err) {
    console.log(JSON.stringify(err, null, 2))
  }

}

postBatch()


