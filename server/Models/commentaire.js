
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  content: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String }, // Chemin vers l'image de l'élève (facultatif)
createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
