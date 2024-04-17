const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Eleve = require('../Models/Eleve');
const nodemailer = require('nodemailer');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




exports.registerEleve = async (req, res) => {
  try {
    // Extraire les données de la requête
    const { nom, prenom, photo, numero, datenai, gouvernorat, classe, email, password, matricule } = req.body;

    // Vérifier si l'élève existe déjà
    const existingEleve = await Eleve.findOne({ email });
    if (existingEleve) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le coût de hachage, plus il est élevé, plus le hachage est sécurisé

    // Créer un nouvel élève avec le mot de passe crypté
    const newEleve = new Eleve({
      nom,
      prenom,
      photo,
      numero,
      datenai,
      gouvernorat,
      classe,
      email,
      password: hashedPassword, // Utiliser le mot de passe crypté
      matricule
    });

    // Sauvegarder l'élève dans la base de données
    await newEleve.save();

    // Répondre avec un message de succès
    res.status(201).json({ message: 'Compte créé avec succès!' });
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    console.error('Erreur lors de la création du compte:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du compte. Veuillez réessayer.' });
  }
};

exports.getEleveById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'élève depuis les paramètres de la requête
  try {
    // Rechercher l'élève dans la base de données par son ID
    const eleve = await Eleve.findById(id);
    if (!eleve) {
      return res.status(404).json({ error: "Aucun élève trouvé avec cet ID." });
    }
    // Renvoyer les informations de l'élève avec l'URL de l'image
    const { nom, prenom, photo, datenai, numero, gouvernorat, classe, email, matricule } = eleve;
    return res.status(200).json({ nom, prenom, photo, datenai, numero, gouvernorat, classe, email, matricule });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'élève :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des informations de l'élève." });
  }
};

exports.updateProfileById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Les données à mettre à jour

  try {
    // Rechercher l'élève dans la base de données par son ID et mettre à jour ses informations
    const updatedEleve = await Eleve.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedEleve) {
      return res.status(404).json({ error: "Aucun élève trouvé avec cet ID." });
    }

    // Renvoyer les informations mises à jour de l'élève
    return res.status(200).json(updatedEleve);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil de l\'élève :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du profil de l'élève." });
  }
};



exports.loginEleve = async (req, res) => {
  // Récupérer les données d'identification de l'élève depuis le corps de la requête
  const { email, password } = req.body;

  try {
    // Vérifier si l'email de l'élève existe dans la base de données
    const existingEleve = await Eleve.findOne({ email });
    if (!existingEleve) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    // Vérifier si le mot de passe correspond
    const passwordMatch = await bcrypt.compare(password, existingEleve.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    // Générer un jeton JWT contenant l'ID de l'élève
    const token = jwt.sign({ id: existingEleve._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Renvoyer le jeton JWT et l'ID de l'élève dans la réponse
    return res.status(200).json({ message: "Connexion réussie!", token, id: existingEleve._id });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'élève :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
};

exports.getAllEleves = async (req, res) => {
  try {
    // Récupérer tous les élèves depuis la base de données
    const eleves = await Eleve.find();
    // Renvoyer la liste des élèves
    return res.status(200).json(eleves);
  } catch (error) {
    console.error('Erreur lors de la récupération des élèves :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des élèves." });
  }
};
exports.deleteparid = async (req, res) => {
  
    try {
      const eleve = await Eleve.findByIdAndDelete(req.params.id);
      if (!eleve) {
        return res.status(404).json({ message: "L'élève n'a pas été trouvé." });
      }
      res.status(200).json({ message: "L'élève a été supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'élève :", error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'élève." });
    }
  };
  exports.modifierparid = async (req, res) => {
    try {
      const { nom, prenom, datenai, numero, gouvernorat, classe } = req.body;
      const eleve = await Eleve.findByIdAndUpdate(req.params.id, { nom, prenom, datenai, numero, gouvernorat, classe }, { new: true });
      if (!eleve) {
        return res.status(404).json({ message: "L'élève n'a pas été trouvé." });
      }
      res.status(200).json({ message: "Profil de l'élève mis à jour avec succès.", eleve });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil de l'élève :", error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du profil de l'élève." });
    }
  }
  exports.getelevebymatricule = async (req, res) => {
  try {
    const eleve = await Eleve.findOne({ matricule: req.params.matricule });
    if (!eleve) {
      return res.status(404).json({ message: "Aucun élève trouvé avec ce matricule." });
    }
    res.status(200).json(eleve);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'élève par matricule:', error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des informations de l'élève." });
  }
};



exports.sendPasswordByEmail = async (req, res) => {
    const { email } = req.params; // Récupérez l'e-mail de l'URL

    if (!email) {
        return res.status(400).json("Veuillez fournir une adresse email");
    }

    try {
        const eleve = await Eleve.findOne({ email: email });

        if (eleve) {
          

            // Configurez Nodemailer pour utiliser votre service d'envoi d'e-mails
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hachemmatboui20@gmail.com',
                    pass: 'mmqk retr hjog wnfe'
                }
            });

          
               let mailOptions = {
                from: 'hachemmatboui20@gmail.com',
                to: email,
                subject: 'creer votre nouveau mot de pass a partir de cette lien ',
                text : 'creer votre nouveau mot de pass a partir de cette lien => http://localhost:3001/moudifier_pawwsord_eleve'
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


exports.getPasswordByEmail = async (req, res) => {
  const { email } = req.params; // Utilisez "req.params" pour récupérer l'e-mail de l'URL
  
  if (!email) {
      return res.status(400).json("Veuillez fournir une adresse email");
  }

  try {
      const eleve = await Eleve.findOne({ email: email });

      if (eleve) {
        
          res.json({ password: eleve.password });
      } else {
          res.json("EmailNotFound");
      }
  } catch (error) {
      console.error(error);
      res.status(500).json("Une erreur s'est produite");
  }
};

exports.updatePasswordByEmail = async (req, res) => {
  const email = req.params.email;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

      const eleve = await Eleve.findOneAndUpdate({ email: email }, { password: hashedPassword });

      if (eleve) {
          res.status(200).json("Mot de passe mis à jour avec succès");
      } else {
          res.status(404).json("Aucun utilisateur trouvé avec cet e-mail");
      }
  } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      res.status(500).json("Une erreur s'est produite lors de la mise à jour du mot de passe");
  }
};

/*exports.getInfoByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const eleve = await (require('../Models/Eleve')).findOne({ email });

    if (!eleve) {
      return res.status(404).json({ message: "Aucun élève trouvé avec cet e-mail." });
    }

    return res.status(200).json({ eleve });
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'élève :", error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des informations de l'élève." });
  }
};*/


/*exports.verifierEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Recherche de l'élève par email
    const existingEleve = await (require('../Models/Eleve')).findOne({ email });

    // Si un élève avec cet email existe déjà
    if (existingEleve) {
      return res.json({ "emailExists": true });
    } else {
      return res.json({ "emailExists": false }); // Correction ici: enlever l'espace avant "emailExists"
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la vérification de l'e-mail." });
  }
};
*/