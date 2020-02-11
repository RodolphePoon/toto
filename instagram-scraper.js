const fetch = require('node-fetch')
const fs = require('fs')
const FormData = require('form-data')
const { access_token, user_id } = require('./access.json')
async function getAccessToken(code = "") {

  const form_data = new FormData();
  form_data.append('client-id', '523006515009344')
  form_data.append('client-secret', '5fde9b1d13e9b9386b57c4db6a6c8ded')
  form_data.append('grant_type', "authorization_code")
  form_data.append('redirect_uri', 'https://rodolphepoon.github.io/toto/')
  form_data.append('code', code.replace('#_', ''))

  // Default options are marked with *
  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: form_data // body data type must match "Content-Type" header
  });

  const json = await response.json();
  console.log(json, response)
  return json // parses JSON response into native JavaScript objects
}

async function start() {
  const sub = "/media"
  const query = "fields=id,caption"
  const url = `https://graph.instagram.com/me${sub}?${query}&access_token=${access_token}`

  const response = await fetch(url)
  const json = await response.json()
  console.log({ json })
  const data = json.data

  for (const media of data) {
    console.log({ media: JSON.stringify(media) })
  }
}


async function start2() {
  const url = "https://www.instagram.com/explore/locations/610379945784130/21g-dumpling/"
  const response = await fetch(url)
  console.log({
    response
  })
  const dest = fs.createWriteStream('./test.html');
  response.body.pipe(dest);
}

//start2()

async function start3() {
  const url = "https://www.instagram.com/p/B7_gdkNoeLm/"//"https://www.instagram.com/foodhere.fr/tagged/"
  //const response = await fetch(url, { headers: { Cookie: `sessionid=7811100347%3AICDsQMY4STC2kk%3A24` }, })
  const response = await fetch(url)

  console.log({
    response
  })
  const dest = fs.createWriteStream('./test3.html');
  response.body.pipe(dest);
}

//start3()

async function start4() {
  const url = "https://www.instagram.com/graphql/query/?query_hash=ff260833edf142911047af6024eb634a&variables=%7B%22id%22%3A%227811100347%22%2C%22first%22%3A12%7D"
  //const url = 'https://www.instagram.com/graphql/query/?query_hash=ff260833edf142911047af6024eb634a&variables=:{"id":"7811100347","first":12}'//"https://www.instagram.com/foodhere.fr/tagged/"
  const response = await fetch(url)


  const json = await response.json()

  console.log(JSON.stringify(json, null, 2))
}

const query_hash = "ff260833edf142911047af6024eb634a"
const variables = { id: "7811100347", first: 12 }

console.log(createUrl(query_hash, variables))
console.log("https://www.instagram.com/graphql/query/?query_hash=ff260833edf142911047af6024eb634a&variables=%7B%22id%22%3A%227811100347%22%2C%22first%22%3A12%7D")
//start4()




function createUrl(query_hash, variables) {
  const myUrl = new URL('https://www.instagram.com/graphql/query/');
  myUrl.searchParams.append('query_hash', query_hash);
  myUrl.searchParams.append('variables', encodeUriObject(variables));
  return myUrl.href

}

function encodeUriObject(object) {
  const params = []
  for (const key in object) {
    const param = object[key]
    let encodedParam
    if (typeof param === 'object')
      encodedParam = encodeUriObject(param)
    else {
      encodedParam = JSON.stringify(param)
    }
    params.push(`'${key}':${encodedParam}`)

  }
  return `{${params.join(',')}}`
  //%7B%22id%22%3A%227811100347%22%2C%22first%22%3A12%7D
}