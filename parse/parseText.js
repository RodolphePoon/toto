const findMatch = require('./findMatch')
const adressMarkers = ['📍'].join('|')
const restaurantMarkers = ['🏠'].join('|')
const dishMarkers = ['🍽️'].join('|')
const priceMarkers = ['💵'].join('|')
module.exports = (text) => {
  const mentions = text.match(/@([^@ \n\t\r])*/gi)
  const hashtags = text.match(/#([^# \n\t\r])*/gi)
  const adress = findMatch(text, adressMarkers, '\n\t\r')
  const restaurant = findMatch(text, restaurantMarkers, '\n\t\r')
  const dish = findMatch(text, dishMarkers, '\n\t\r')
  const price = findMatch(text, priceMarkers, '\n\t\r') || ''
  const value = (price.match(/\d+/g) || [])[0] || 0
  const devise = (price.match(/\D/gi) || [])[0] || null
  return {
    mentions, hashtags, adress, restaurant, dish, value, devise
  }
}