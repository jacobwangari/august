const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'schedulingappdatabase';
const client = new MongoClient(uri);

let db;
let usersCollection;
let activitiesCollection;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    usersCollection = db.collection('users');
    activitiesCollection = db.collection('Activity');
    console.log('Connected to MongoDB and collections are set');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

const getUsersCollection = () => {
  if (!usersCollection) {
    throw new Error('Users collection is not initialized');
  }
  return usersCollection;
};

const getActivitiesCollection = () => {
  if (!activitiesCollection) {
    throw new Error('Activities collection is not initialized');
  }
  return activitiesCollection;
};

module.exports = { connectToDB, getUsersCollection, getActivitiesCollection };
