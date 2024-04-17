const CoursPDF = require('../Models/CoursPDF');

exports.ajouterCoursPDF = async (req, res) => {
    try {
        // Extraction des données du corps de la requête
        const { titre, niveau, matiere } = req.body;

        // Vérification des données obligatoires
        if (!titre || !niveau || !matiere || !req.file) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        // Création d'une instance du modèle de cours PDF
        const cours = new CoursPDF({
            titre,
            niveau,
            matiere,
            pdfFile: req.file.buffer
        });

        // Enregistrement du cours PDF dans la base de données
        await cours.save();

        // En cas de succès, renvoyer une réponse avec un message approprié
        return res.status(200).json({ message: 'Cours PDF ajouté avec succès' });
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de l\'ajout du cours PDF :', error);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout du cours PDF' });
    }
};
