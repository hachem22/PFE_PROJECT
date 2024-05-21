const EnseignantModel = require("../Models/Enseignant");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.AjouterEnseignant = async (req, res) => {
  console.log(req.body);
    const EnseignantObj = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    photo:req.body.photo,
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
    const Enseignant = await EnseignantModel.findOne({ email });
    if (!Enseignant) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }
    const isPasswordValid = await bcrypt.compare(password, Enseignant.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }
    const token = jwt.sign({ id: Enseignant._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.status(200).json({ message: "Connexion réussie!", token, id: Enseignant._id });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'enseignant :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
};
exports.getenseignantparId = async (req, res) => {
  
  try {
    const Enseignant = await EnseignantModel.findById(req.params.EnseignantId);
    if (!Enseignant) {
      return res.status(404).json({ message: 'Enseignant non trouvé' });
    }
    return res.status(200).json(Enseignant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des informations de l\'enseignant' });
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

exports.getAllEnseignants = async (req, res) => {
  try {
    const enseignants = await EnseignantModel.find();
    res.status(200).json(enseignants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEnseignantById = async (req, res) => {
  const { id } = req.params;
  try {
    await EnseignantModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Enseignant supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEnseignantById = async (req, res) => {
  const { id } = req.params;
  const updatedEnseignant = req.body;
  try {
    const enseignant = await EnseignantModel.findByIdAndUpdate(id, updatedEnseignant, { new: true });
    res.status(200).json(enseignant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateEnseignantbyId = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, datenai, numero, specialite } = req.body;
  try {
    const updatedEnseignant = await EnseignantModel.findByIdAndUpdate(
      id,
      { nom, prenom, datenai, numero, specialite },
      { new: true }
    );
    res.status(200).json({ updatedEnseignant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.sendPasswordByEmailEnseignant = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json("Veuillez fournir une adresse email");
  }

  try {
    const enseignant = await EnseignantModel.findOne({ email: email });

    if (enseignant) {
      // Configurez Nodemailer pour utiliser votre service d'envoi d'e-mails
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hachemmatboui20@gmail.com',
          pass: 'llag csgb buom sfmv'
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let mailOptions = {
        from: 'hachemmatboui20@gmail.com',
        to: email,
        subject: 'Créez votre nouveau mot de passe à partir de ce lien',
        text: 'Créez votre nouveau mot de passe à partir de ce lien => http://localhost:3001/moudifier_pawwsord_enseignant'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          res.status(500).json("Une erreur s'est produite lors de l'envoi de l'e-mail");
        } else {
          console.log('Email sent: ' + info.response);
          res.json("EmailSent");
        }
      });
    } else {
      res.json("EmailNotFound");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Une erreur s'est produite");
  }
};

exports.updatePasswordByEmailEnseignant = async (req, res) => {
  const email = req.params.email;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

      const enseignant = await EnseignantModel.findOneAndUpdate({ email: email }, { password: hashedPassword });

      if (enseignant) {
          res.status(200).json("Mot de passe mis à jour avec succès");
      } else {
          res.status(404).json("Aucun utilisateur trouvé avec cet e-mail");
      }
  } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      res.status(500).json("Une erreur s'est produite lors de la mise à jour du mot de passe");
  }
};