const runLocation = require('./parse/parseLocationPageHtml')
const runPostPage = require('./parse/parsePostPageHtml')


const url = "https://www.instagram.com/p/B8riW5hoo6X/"
runPostPage(url, true, "DEONTOLOGIE")

const url2 = "https://www.instagram.com/explore/locations/102313571318482/mcdonalds-paris/"
runLocation(url2, true, "MAGNANIME")