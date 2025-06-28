// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PWD;
const host = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB;

const uri = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectDB;