const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rdwf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbClient = new MongoClient(uri);

module.exports = { dbClient };
