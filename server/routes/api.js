const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const data = require('./data.json')
const url = "mongodb+srv://penghezhang:root@groupproject.qhbrl.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
const dbName = "quizdata";

router.get('/', (req, res) => {
  console.log("api '/' works");
});

const questions = getQuestions();

router.get('/test', (req, res) => {
  res.send('data:')
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
});

// router.get('/game',(req,res) => {
//   res.header("Content-Type",'application/json');
//   res.send(JSON.stringify(data));
//   console.log("api '/game' works");
// })

router.get('/game',(req,res) => {
  res.header("Content-Type",'application/json');

  console.log("api '/game' works");
  console.log(questions);
  res.send(JSON.stringify(data));
});

async function getQuestions() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("quizdata");

    // Use the collection "people"
    const col = db.collection("questions");

    // Print to the console
    return await col.find({}).toArray();

  } catch (err) {
    console.log(err.stack);
  }

  finally {
    await client.close();
  }
}

module.exports = router;
