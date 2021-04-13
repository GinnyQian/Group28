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
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  // axios.get(`${API}/quiz`)
  //   .then(posts => {
  //     res.status(200).json(posts.data);
  //   })
  //   .catch(error => {
  //     res.status(500).send(error)
  //   });
  res.send('api works');
});

router.get('/quiz',(req,res) => {
  //res.send('quiz data');
  // axios.get(`${API}/quiz`)
  //   .then(posts => {
  //     res.status(200).json(posts.data);
  //   })
  //   .catch(error => {
  //     res.status(500).send(error)
  //   });
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data))
})

module.exports = router;
