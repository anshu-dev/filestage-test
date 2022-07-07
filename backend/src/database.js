const { MongoClient } = require('mongodb');

const database = module.exports;

database.connect = async function connect() {
  database.client = new MongoClient('mongodb://localhost:27017/todo');
  await database.client.connect();
};
