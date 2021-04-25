const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const data = require('./data.json')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://penghezhang:<root>@groupproject.qhbrl.mongodb.net/quizdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const col = client.db('quizdata').collection("questions");


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

// router.get('/test',(req,res) => {
//   client.connect(error => {
//     console.log("connected");
//
//     client.close();
//     }
//   )
// });

module.exports = router;
