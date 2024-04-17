const EnseignantModel = require("../Models/Enseignant");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.AjouterEnseignant = async (req, res) => {
  console.log(req.body);
    const EnseignantObj = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    numero: req.body.numero,
    specialite: req.body.specialite,
    email: req.body.email,
    password: req.body.password
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    EnseignantObj.password = hashedPassword;
    const Enseignant = new EnseignantModel(EnseignantObj);
    const createdEnseignant = await Enseignant.save();
    return res.status(200).json({ createdEnseignant });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
exports.loginEnseignant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingEnseignant = await EnseignantModel.findOne({ email });
    if (!existingEnseignant) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }
    const passwordMatch = await bcrypt.compare(password, existingEnseignant.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }
    const token = jwt.sign({ id: existingEnseignant._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.status(200).json({ message: "Connexion réussie!", token, id: existingEnseignant._id });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'enseignant :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
};

exports.verifierEmailEnseignant = async (req, res) => {
    const { email } = req.params;
    try {
        const existingEnseignant = await EnseignantModel.findOne({ email });
        if (existingEnseignant) {
            return res.json({ "emailExists": true });
        } else {
            return res.json({ "emailExists": false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Une erreur s'est produite lors de la vérification de l'e-mail." });
    }
};
exports.getInfoByEmailEnseignant = async (req, res) => {
    const { email } = req.params;
    try {
      const Enseignant = await EnseignantModel.findOne({ email });
  
      if (!Enseignant) {
        return res.status(404).json({ message: "Aucun élève trouvé avec cet e-mail." });
      }
      return res.status(200).json({ Enseignant });
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'élève :", error);
      return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des informations de l'élève." });
    }
  };
  
  exports.enseignantparId = async (req, res) => {
  
    try {
      const enseignant = await EnseignantModel.findById(req.params.enseignantId);
      if (!enseignant) {
        return res.status(404).json({ message: 'Enseignant non trouvé' });
      }
      return res.status(200).json(enseignant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des informations de l\'enseignant' });
    }
}
