const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'schedulingappdatabase';
const client = new MongoClient(uri);

let db;
let usersCollection;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    usersCollection = db.collection('users');
    console.log('Connected to MongoDB and user collection is set');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

async function printUsers() {
  if (!usersCollection) {
    console.error('Users collection is not set');
    return;
  }

  try {
    const users = await usersCollection.find({}).toArray();
    console.log('Users available:', users);
  } catch (err) {
    console.error('Failed to fetch users', err);
  }
}

const getUsersCollection = () => {
  if (!usersCollection) {
      throw new Error('Users collection is not initialized');
  }
  return usersCollection;
};

module.exports = { connectToDB, printUsers, db, usersCollection,getUsersCollection };

