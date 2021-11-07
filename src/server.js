'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');

const signIn = require('./auth/signIn')
const signUp = require('./auth/signUp')

// Prepare the express app
const server = express();

// Process JSON input and put the data on req.body
server.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Process FORM intput and put the data on req.body
server.use(express.urlencoded({ extended: true }));

// Create a Sequelize model


// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
server.post('/signup', signUp)
server.post('/signin', signIn)


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    server.listen(3000, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });

  function start(PORT){
    server.listen(PORT,()=>{
    console.log(`${PORT}`)
})
}

module.exports={server:server,start:start}