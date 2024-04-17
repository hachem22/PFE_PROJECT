const mongoose = require('mongoose');

const eleveSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true,
    unique: true

  },
  datenai: {
    type: Date,
    required: true
  },
  gouvernorat: {
    type: String,
    required: true
  },
  classe: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  matricule: {
    type: String,
    required: true,
    unique: true

  }
});

const Eleve = mongoose.model('Eleve', eleveSchema);

module.exports = Eleve;
