const mongoose = require('mongoose');

const coursSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
 
  },
  niveau: {
    type: String,
    required: true,
   
  },
  matiere: {
    type: String,
    required: true,

  },
 duree: {
    type: String,
    required: true,
  
  },
  video: {
    type: String,
    required: true
  }
}, { collection: 'cours' });

const CoursModel = mongoose.model('cours', coursSchema);

module.exports = CoursModel;
