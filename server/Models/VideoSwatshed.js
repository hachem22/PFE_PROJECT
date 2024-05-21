const mongoose = require('mongoose');

const videoSwatshedSchema = new mongoose.Schema({
  eleveId: {
    type: String,
    required: true
  },
  matiere: {
    type: String,
    required: true
  },
  niveau: {
    type: String,
    required: true
  },
  listVideosRegarder: {
    type: [String], // Modifier le type en tableau de chaînes
    required: true
  }
});

const VideoSwatshed = mongoose.model('VideoSwatshed', videoSwatshedSchema);

module.exports = VideoSwatshed;
