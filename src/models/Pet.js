// src/models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ownerDni: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;