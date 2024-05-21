const Progression = require('../Models/Progression');

exports.putprogressioneleveparmatiere = async (req, res) => {
    try {
        const { eleveId } = req.params;
        const { matricule } = req.params;

        const { progressionMath, progressionPhysique, progressionTechnique, progressionInformatique, progressionFrancais, progressionAnglais, progressionArabe } = req.body;

        const updatedFields = {
            progressionmath: progressionMath ,
            progressionphysique: progressionPhysique ,
            progressiontechnique: progressionTechnique,
            progressioninformatique: progressionInformatique,
            progressionfrancais: progressionFrancais ,
            progressionanglais: progressionAnglais,
            progressionarabe: progressionArabe,
            
        };

        const updatedProgression = await Progression.findOneAndUpdate({ eleveId: eleveId, matricule: matricule }, updatedFields, { new: true, upsert: true });

        res.status(200).json(updatedProgression);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la progression de l\'élève :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la progression de l\'élève' });
    }
};
exports.getProgressionById = async (req, res) => {
    try {
      const { eleveId } = req.params;
  
      const progression = await Progression.findOne({ eleveId });
  
      if (!progression) {
        return res.status(404).json({ message: "La progression de l'élève n'a pas été trouvée." });
      }
  
      const {progressionmath,progressionphysique,progressiontechnique,progressioninformatique,progressionarabe,progressionfrancais,progressionanglais } = progression;
      return res.status(200).json({ progressionmath,progressionphysique,progressiontechnique,progressioninformatique ,progressionarabe,progressionfrancais,progressionanglais});
      } catch (error) {
      console.error('Erreur lors de la récupération de la progression de l\'élève :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la progression de l\'élève' });
    }
  };
  exports.getProgressionByMatricule = async (req, res) => {
    try {
      const { matricule } = req.params;
  
      const progression = await Progression.findOne({ matricule });
  
      if (!progression) {
        return res.status(404).json({ message: "La progression de l'élève avec ce matricule n'a pas été trouvée." });
      }
  
      const { progressionmath, progressionphysique, progressiontechnique, progressioninformatique, progressionarabe, progressionfrancais, progressionanglais } = progression;
      return res.status(200).json({ progressionmath, progressionphysique, progressiontechnique, progressioninformatique, progressionarabe, progressionfrancais, progressionanglais });
    } catch (error) {
      console.error('Erreur lors de la récupération de la progression de l\'élève par matricule :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la progression de l\'élève par matricule' });
    }
  };

/*exports.putprogressioneleveparmatiere = async (req, res) => {
    try {
      const { eleveId } = req.params;
      const { progressionMath, progressionPhysique, progressionTechnique, progressionInformatique, progressionFrancais, progressionAnglais, progressionArabe } = req.body;
  
      // Vérifiez si progressionMath est défini, sinon utilisez la valeur par défaut 0
      const updatedFields = {
        progressionmath: progressionMath,
        progressionphysique: progressionPhysique,
        progressiontechnique: progressionTechnique,
        progressioninformatique: progressionInformatique,
        progressionfrancais: progressionFrancais,
        progressionanglais: progressionAnglais,
        progressionarabe: progressionArabe
      };
  
      const updatedEleve = await Eleve.findByIdAndUpdate(eleveId, updatedFields, { new: true });
  
      res.status(200).json(updatedEleve);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la progression de l\'élève :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la progression de l\'élève' });
    }
  };
  */
  