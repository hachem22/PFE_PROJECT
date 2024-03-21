const CoursModel = require('../Models/Cours');

exports.AddCours = async (req, res) => {
    console.log(req.body);
    
    const CoursObj = {
        titre: req.body.titre,
        niveau: req.body.niveau,
        matiere: req.body.matiere,
        duree: req.body.duree,
        video: req.file ? req.file.path : null, // Vérifier si req.file existe avant d'accéder à sa propriété path
    }
   
    try {
        const Cours = new CoursModel(CoursObj);
        const createdCours = await Cours.save();
        return res.status(200).json({ createdCours });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
exports.getAllCours = async (req, res) => {
    try {
        const cours = await CoursModel.find();
        return res.status(200).json({ cours });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}