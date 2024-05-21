const VideoSwatshed = require('../Models/VideoSwatshed');

exports.getProgression = async (req, res) => {
  try {
    const { matiere, niveau, eleveId } = req.params;
    const progression = await VideoSwatshed.findOne({ matiere, niveau, eleveId });
    if (!progression) {
      return res.status(404).json({ message: 'Aucune progression trouvée pour cet élève, matière et niveau.' });
    }
    res.json(progression.listVideosRegarder);
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos regardées :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des vidéos regardées' });
  }
};

exports.saveProgression = async (req, res) => {
  const { eleveId, matiere, niveau, listVideosRegarder } = req.body;

  try {
    let progression = await VideoSwatshed.findOne({ eleveId, matiere, niveau });

    if (!progression) {
      progression = new VideoSwatshed({
        eleveId,
        matiere,
        niveau,
        listVideosRegarder
      });
    } else {
      progression.listVideosRegarder = listVideosRegarder;
    }

    const savedProgression = await progression.save();
    res.status(201).json(savedProgression);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la progression :', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la progression' });
  }
};
