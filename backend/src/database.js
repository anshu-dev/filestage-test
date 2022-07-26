const { MongoClient } = require('mongodb');

const database = module.exports;

database.connect = async function connect() {
  database.client = new MongoClient('mongodb://database:27017/');
  await database.client.connect();
};
