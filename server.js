
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://penghezhang:<root>@groupproject.qhbrl.mongodb.net/quizdata?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   //const collection = client.db("sample_airbnb").collection("listingsAndReviews");
//   // perform actions on the collection object
//   //const col = client.db("quizdata").collection("questions");
//   console.log("connected")
//   console.log(client.db('quizdata').collection("questions"));
//   // console.log(col.findOne());
//
//   client.close();
// });


// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist (folder where build files are located)
app.use(express.static(path.join(__dirname, 'dist/myapp')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/myapp/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
