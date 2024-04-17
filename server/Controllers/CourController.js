const cloudinary = require('cloudinary').v2;
const CoursModel = require('../Models/Cours');
const multer = require('multer');

// Configurer Cloudinary avec vos identifiants
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration de multer pour le téléchargement de fichiers MP4


exports.AjouterCour = async (req, res) => {
  try {
    const coursObj = {
      titre: req.body.titre,
      niveau: req.body.niveau,
      matiere: req.body.matiere,
      numeroVideo: req.body.numeroVideo, // Utilisez le numéro de vidéo fourni dans la requête
      videoUrl: req.body.videoUrl,
    };

    const cours = new CoursModel(coursObj);
    const createdCours = await cours.save();
    return res.status(200).json({ createdCours });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du cours :', error);
    return res.status(400).json({ error: error.message });
  }
};
  

exports.getAllCours = async (req, res) => {
  try {
    const cours = await CoursModel.find();
    if (!cours || cours.length === 0) {
      return res.status(404).json({ message: "Aucun cours trouvé." });
    }

    // Organisez les cours avec leurs détails, comme vous le souhaitez
    // Vous pouvez également choisir de renvoyer uniquement les détails nécessaires
    // pour chaque cours
    const coursDetails = cours.map((c) => ({ videoUrl:c.videoUrl , titre: c.titre, niveau: c.niveau, matiere: c.matiere,numeroVideo: c.numeroVideo }));

    return res.status(200).json({ cours: coursDetails });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};




exports.getCoursByNiveauAndMatiere = async (req, res) => {
  const niveau = req.params.niveau;
  const matiere = req.params.matiere;
  
  try {
    const cours = await CoursModel.find({ niveau, matiere });
    if (!cours || cours.length === 0) {
      return res.status(404).json({ message: "Aucun cours trouvé pour ce niveau et cette matière." });
    }

    // Organiser les vidéos avec leurs numéros
    const videos = cours.map((c, index) => ({ videoUrl: c.videoUrl, titre: c.titre, numeroVideo: index + 1 }));

    return res.status(200).json({ videos });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


exports.SupprimerCour = async (req, res) => {
  try {
    const coursId = req.params.id;
    const deletedCours = await CoursModel.findByIdAndDelete(coursId);
    if (!deletedCours) {
      return res.status(404).json({ error: 'Le cours spécifié n\'a pas été trouvé' });
    }
    return res.status(200).json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du cours :', error);
    return res.status(400).json({ error: error.message });
  }
};
exports.ModifierCour = async (req, res) => {
  try {
    const coursId = req.params.id;
    const coursObj = {
      titre: req.body.titre,
      niveau: req.body.niveau,
      matiere: req.body.matiere,
      numeroVideo: req.body.numeroVideo,
      videoUrl: req.body.videoUrl,
    };
    const updatedCours = await CoursModel.findByIdAndUpdate(coursId, coursObj, { new: true });
    if (!updatedCours) {
      return res.status(404).json({ error: 'Le cours spécifié n\'a pas été trouvé' });
    }
    return res.status(200).json({ updatedCours });
  } catch (error) {
    console.error('Erreur lors de la modification du cours :', error);
    return res.status(400).json({ error: error.message });
  }
};
exports.deleteCours = async (req, res) => {
  try {
      const deletedCourse = req.body;
      await Cours.deleteOne({ _id: deletedCourse._id });
      res.status(200).json({ message: "Cours supprimé avec succès.", deletedCourse });
  } catch (error) {
      console.error("Erreur lors de la suppression du cours :", error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du cours." });
  }
};
