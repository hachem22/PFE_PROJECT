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
    const { nom, prenom, photo, datenai, numero, gouvernorat, classe, email, matricule,progressionmath,progressionphysique,progressiontechnique,progressioninformatique,progressionarabe,progressionfrancais,progressionanglais } = eleve;
    return res.status(200).json({ nom, prenom, photo, datenai, numero, gouvernorat, classe, email, matricule,progressionmath,progressionphysique,progressiontechnique,progressioninformatique ,progressionarabe,progressionfrancais,progressionanglais});
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'élève :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des informations de l'élève." });
  }
};

exports.updateProfileById = async (req, res) => {
  const { id } = req.params;    // il faut ici utilise req auth id il faut toujour crypter et passe par header comme best practice 
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
    return res.status(200).json({ message: "Connexion réussie!", token, id: existingEleve._id, matricule: existingEleve.matricule  });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'élève :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
};


exports.checkEmail = async (req, res) => {
  // Récupérer l'e-mail à vérifier depuis le corps de la requête
  const { email } = req.body;

  try {
    // Vérifier si l'e-mail existe déjà dans la base de données
    const existingEleve = await Eleve.findOne({ email });
    if (existingEleve) {
      return res.status(200).json({ emailExists: true });
    } else {
      return res.status(200).json({ emailExists: false });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'e-mail de l\'élève :', error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la vérification de l'e-mail." });
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
  const { email } = req.body;

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
        text: 'Créez votre nouveau mot de passe à partir de ce lien => http://localhost:3001/moudifier_pawwsord_eleve'
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




/*exports.getPasswordByEmail = async (req, res) => {
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
*/
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



exports.getvideoswatchedbyMatiere = async (req, res) => {
  try {
    const { id, matiere } = req.params;
    const eleve = await Eleve.findById(id).populate(`watchedVideos${matiere}`);
    if (!eleve) {
      return res.status(404).json({ message: "Élève non trouvé." });
    }
    res.status(200).json(eleve[`watchedVideos${matiere}`]);
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos regardées :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des vidéos regardées." });
  }
};

exports.postvideoswatchedbyMatiere = async (req, res) => {
  try {
    const { id, matiere } = req.params;
    const { videoId } = req.body;

    const eleve = await Eleve.findById(id);
    if (!eleve) {
      return res.status(404).json({ message: "Élève non trouvé." });
    }

    eleve[`watchedVideos${matiere}`].push(videoId);
    await eleve.save();

    res.status(200).json({ message: "Vidéo regardée ajoutée avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la vidéo regardée :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de la vidéo regardée." });
  }
};

exports.putvideoswatchedbyMatiere = async (req, res) => {
  try {
    const { id, matiere } = req.params;
    const { oldVideoId, newVideoId } = req.body;

    const eleve = await Eleve.findById(id);
    if (!eleve) {
      return res.status(404).json({ message: "Élève non trouvé." });
    }

    const index = eleve[`watchedVideos${matiere}`].indexOf(oldVideoId);
    if (index !== -1) {
      eleve[`watchedVideos${matiere}`][index] = newVideoId;
      await eleve.save();
      res.status(200).json({ message: "Vidéo regardée mise à jour avec succès." });
    } else {
      return res.status(404).json({ message: "Vidéo regardée non trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la vidéo regardée :", error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de la vidéo regardée." });
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
