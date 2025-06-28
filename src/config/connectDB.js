const mongoose = require('mongoose');
require('dotenv').config();

const mongoAtlasURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

async function connectDB() {
  try {
    await mongoose.connect(mongoAtlasURI);
    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
  }
}

module.exports = connectDB;