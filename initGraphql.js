'use strict';
const _ = require('lodash')
const awsmobile = require('./aws-exports')
const { default: Amplify } = require('aws-amplify');
require('es6-promise').polyfill();
require('isomorphic-fetch');
// POLYFILLS
global.WebSocket = require('ws');
global.window = global.window || {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  WebSocket: global.WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener: function () { },
  navigator: { onLine: true }
};
global.localStorage = {
  store: {},
  getItem: function (key) {
    return this.store[key]
  },
  setItem: function (key, value) {
    this.store[key] = value
  },
  removeItem: function (key) {
    delete this.store[key]
  }
};

Amplify.configure(awsmobile);
const { Auth, API } = Amplify

const state = {}

const init = async (username, password) => {
  const user = await Auth.signIn(username, password)
  let { data } = await API.graphql({
    query: getUser,
    variables: {
      id: user.id || user.attributes.sub
    },
    authMode: 'AWS_IAM'
  })
  state.user = {
    username: data.getUser.name,
    user_img: data.getUser.src,
    id: data.getUser.id,
  }
  return 'OK'

}


const getUser = `query GetUserId($id: ID!) {
  getUser(id: $id) {
   id
   name:username
   src:user_img
  }
}
`



const newPost = `mutation NewPost($input: newPost) {
  newPost(input: $input) {
    ok
  }
}
`;
/*
const uploadPost = async (data) => {
  console.log('[uploadPost]', JSON.stringify({ ...data, user: state.user }, null, 2))
  return 'dd'
}
*/



const uploadPost = async (data) => {

  const res = await API.graphql({
    query: newPost,
    variables: { input: { ...data, user: state.user } },
    authMode: "AWS_IAM"
  })
  return res
}

const hello = `
query ff{
  hello
}
`

const helloWorld = () => API.graphql({
  query: hello, authMode: "AWS_IAM"
})

module.exports = { uploadPost, helloWorld, state, init }
