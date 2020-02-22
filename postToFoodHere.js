const { uploadPost, init } = require('./initGraphql')
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
      email: email,
      phone: phone,
      website: website,
      sections: [],
      amenities: []
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
/*

const format = () => {

  return{
  restaurant: {
    adress: "1234 rue toto",
    provider: "google",
    amenities: [],
    lat: 1.11,
    lon: 1.11,
    sections: [],
    name: "LEBATO",
  },
  dish: {
    allergies: [],
    categories: [],
    customizable: true,
    devise: "EUR",
    name: "sushi",
    keywords: [],
    options: [],
    price: 12,
    restaurantName: "LEBATO",
    section: "sushi",
  },
  post: {
    img_url: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F01%2F12%2F19%2F16%2Fpainting-1136443_960_720.jpg&f=1",
    text: "super bon",
  },
  user: {
    username: "Rodo",
    id: "c74de176-3249-4d7c-8298-1f1abd299dd2",
    user_img: "https://foodhere-20190427142440--hostingbucket.s3-eu-west-1.amazonaws.com/static/media/logo.7f758cef.png",
  },
  liked: true,
  disliked: false,
}}
*/
const getRestaurantId = async ({ lat, lng, restaurant }) => {

  //get restaurant by lat lng
  //find restaurantId by dish name  calc pertinance

  return undefined
}

const getDishId = async (restaurantId, { dish }) => {

  //get dish by restaurant id
  //find dishId by dish name  calc pertinance

  return undefined

}




const postBatch = async (data = []) => {
  try {
    await init()
    data.map(async (input) => {
      const restaurantId = await getRestaurantId(input)
      let dishId
      if (restaurantId) {
        dishId = await getDishId(restaurantId, input)
      }
      const res = await uploadPost(format(Object.assign({}, input, { restaurantId, dishId }))).catch((dd) => console.log(JSON.stringify(dd, null, 2)))
      console.log('[postBatch]', JSON.stringify(res, null, 2))
    })

  } catch (err) {
    console.log(JSON.stringify({ err }, null, 2))
  }
}

postBatch(data)


