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

const init = () => {
  const username = 'Test'
  const password = 'Rodolphe--1994'
  Auth.signIn(username, password).then(async user => {
    let { data } = await API.graphql({
      query: getUser,
      variables: {
        id: user.id || user.attributes.sub
      },
      authMode: 'AWS_IAM'
    })
    console.log({ data })
    state.user = {
      ...data.getUser,
      provider: "foodhere"
    }
  })
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

const uploadPost = (data) => API.graphql({
  query: newPost,
  variables: { input: { ...data, user: state.user, } },
  authMode: "AWS_IAM"
})

const hello = `
query ff{
  hello
}
`

const helloWorld = () => API.graphql({
  query: hello, authMode: "AWS_IAM"
})

module.exports = { uploadPost, helloWorld, state, init }
