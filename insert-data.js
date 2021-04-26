const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "mongodb+srv://penghezhang:root@groupproject.qhbrl.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("quizdata");

    // Use the collection "people"
    const col = db.collection("questions");

    const myDoc = await col.find({}).toArray();
    // Print to the console
    console.log(myDoc);

  } catch (err) {
    console.log(err.stack);
  }

  finally {
    await client.close();
  }
}

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

run().catch(console.dir);
