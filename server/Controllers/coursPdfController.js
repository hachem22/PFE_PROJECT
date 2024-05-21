const CoursPDF = require('../Models/CoursPDF');

exports.ajouterCours = async (req, res) => {
  try {
    const { titre, niveau, matiere } = req.body;
    const fichierPdf = req.file.filename;

    // Créer un nouveau cours
    const nouveauCours = new CoursPDF({ titre, niveau, matiere, fichierPdf });
    await nouveauCours.save();

    res.status(201).json({ message: "Cours ajouté avec succès." });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du cours :', error);
    res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du cours." });
  }
};

exports.getAllCours = async (req, res) => {
  try {
    const coursPDF = await CoursPDF.find();
    res.status(200).json(coursPDF);
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste des cours :', error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la liste des cours." });
  }
};
  exports.getcourparniveau = async (req, res) => {
    const niveau = req.params.niveau;
    try {
      const cours = await CoursPDF.find({ niveau: niveau });
      res.json(cours);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des cours." });
    }
  };