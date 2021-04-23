const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const data = require('./data.json')

/* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });
// Get all posts
router.get('/', (req, res) => {
  console.log("api '/' works");
});

router.get('/test', (req, res) => {
  res.send('data:')
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
});

router.get('/game',(req,res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
  console.log("api '/game' works");
})

module.exports = router;
