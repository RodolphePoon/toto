const appId = 523006515009344
const redirect_uri = 'https://rodolphepoon.github.io/toto/'

const code = 'AQAg16SML6wmLiLkdTOQv5GZgE9ulAnp3l9Dgexvb9L5IL_FMm1ysYFay2V74rgjJpw0F5sQ_HQo1RXV9aobB1O81HS3WVwhWJELbpKT54R72Njw6SR6lU3NahmngpMytBPsjz'
const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`

console.log(url)