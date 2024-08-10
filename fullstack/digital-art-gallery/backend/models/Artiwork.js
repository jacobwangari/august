const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: String,
  artist: String,
  description: String,
  price: Number,
  category: String,
  tags: [String],
  imageUrl: String
});

module.exports = mongoose.model('Artwork', artworkSchema);
