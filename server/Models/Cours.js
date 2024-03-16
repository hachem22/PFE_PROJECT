const mongoose = require('mongoose');

const CoursSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    niveau: { type: String, required: true },
    duree: { type: Number, required: true }, // Durée du cours en minutes par exemple
    videos: [String], // Tableau des liens vers les vidéos
    pdfs: [String] // Tableau des liens vers les fichiers PDF
});

module.exports = mongoose.model('Cours', CoursSchema);
