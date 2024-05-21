const Commentaire = require('../Models/commentaire');


// Récupérer les commentaires par URL de vidéo

exports.getCommentsByVideo = async (req, res) => {
  try {
    const { videoUrl } = req.params;
    const decodedVideoUrl = decodeURIComponent(videoUrl);
    const comments = await Commentaire.find({ videoUrl: decodedVideoUrl });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des commentaires' });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { videoUrl, comment, firstName, lastName, image } = req.body;
    const newComment = new Commentaire({ videoUrl, content: comment, firstName, lastName, image });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Erreur lors de la création du commentaire :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du commentaire' });
  }
};
