import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // carga las variables del .env

const mongoAtlasURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoAtlasURI);
    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
  }
};

export default connectDB;