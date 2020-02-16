
function encodeUriObject(object) {
  const params = []
  for (const key in object) {
    const param = object[key]
    if (param) {
      let encodedParam
      if (typeof param === 'object')
        encodedParam = encodeUriObject(param)
      else {
        encodedParam = JSON.stringify(param)
      }
      params.push(`"${key}":${encodedParam}`)
    }
  }
  return `{${params.join(',')}}`
}

module.exports = (query_hash, variables) => {
  const myUrl = new URL('https://www.instagram.com/graphql/query/');
  myUrl.searchParams.append('query_hash', query_hash);
  myUrl.searchParams.append('variables', encodeUriObject(variables));
  return myUrl.href
}