const appId = 1242465539281127
const redirect_uri = 'https://rodolphepoon.github.io/toto/'


const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`

console.log(url)