// src/models/Owner.js
const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Owner', ownerSchema);