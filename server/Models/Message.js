const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  contenu: { type: String, required: true },
  photo: { type: String }, // Champ pour l'URL de la photo
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
