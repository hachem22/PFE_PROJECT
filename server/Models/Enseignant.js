const mongoose = require('mongoose');

const EnseignantSchema = new mongoose.Schema({
  nom:{
    type: String,
    required: true,
    minlength:2,
    maxlength:20,
  },
 
  prenom: {
    type: String,
    required: true,
    minlength:2,
    maxlength:20,
  },
  photo: {
    type: String,
    required: true
  },
  specialite: {
    type: String,
    required: true,
    minlength:2,
    maxlength:20,
  },
  
  numero: {
    type: Number,
    required: true,
    minlength:8,
    maxlength:8,
    unique: true
  },

  email:  {
    type: String,
    required: true,
    minlength:5,
    maxlength:50,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength:8,
  },
}, { collection: 'Enseignant' });

const EnseignantModel = mongoose.model('Enseignant', EnseignantSchema);

module.exports = EnseignantModel;
