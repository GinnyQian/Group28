// const { MongoClient } = require("mongodb");
//
// // Replace the uri string with your MongoDB deployment's connection string.
//
// const uri = "mongodb+srv://penghezhang:<root>@groupproject.qhbrl.mongodb.net/quizdata?retryWrites=true&w=majority";
//
// const client = new MongoClient(uri);
//
// async function run() {
//   try {
//     await client.connect();
//
//     const database = client.db("quizdata");
//     const movies = database.collection("questions");
//
//     // query for movies that have a runtime less than 15 minutes
//     const query = { runtime: { $lt: 15 } };
//
//     const cursor = movies.find();
//
//     // print a message if no documents were found
//     if ((await cursor.count()) === 0) {
//       console.log("No documents found!");
//     }
//
//     // replace console.dir with your callback to access individual elements
//     await cursor.forEach(console.dir);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://penghezhang:<root>@groupproject.qhbrl.mongodb.net/quizdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("sample_airbnb").collection("listingsAndReviews");
  console.log(3);
  console.log(collection.find({}));
  // perform actions on the collection object
});

