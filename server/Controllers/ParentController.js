const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ParentModel = require('../Models/parent');
const nodemailer = require('nodemailer');

exports.AjouterParent = async (req, res) => {
    const { nom, prenom, numero, matriculeeleve, nomeleve, prenomeleve, email, password } = req.body;

    if (!nom || !prenom || !numero || !matriculeeleve || !nomeleve || !prenomeleve || !email || !password) {
        return res.status(400).json("Veuillez fournir toutes les informations nécessaires");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newParent = new ParentModel({
            nom,
            prenom,
            numero,
            matriculeeleve,
            nomeleve,
            prenomeleve,
            email,
            password: hashedPassword,
            photo,
        });

        await newParent.save();

        res.status(201).json({ message: 'Compte créé avec succès' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.LoginParent = async (req, res) => {
    const { email, password } = req.body;

    try {
        const parent = await ParentModel.findOne({ email });

        if (!parent) {
            return res.status(401).json({ error: "Identifiants incorrects." });
        }

        const isPasswordValid = await bcrypt.compare(password, parent.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Identifiants incorrects." });
        }

        const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return res.status(200).json({ message: "Connexion réussie!", token, id: parent._id });
    } catch (error) {
        console.error('Erreur lors de la connexion du parent :', error);
        return res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
    }
};


  exports.verifierEmailParent = async (req, res) => {
    const { email } = req.params;

    try {
        // Recherche du parent par email
        const existingParent = await ParentModel.findOne({ email });

        // Si un parent avec cet email existe déjà
        if (existingParent) {
            return res.json({ "emailExists": true });
        } else {
            return res.json({ "emailExists": false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Une erreur s'est produite lors de la vérification de l'e-mail." });
    }
};

exports.parentbyid = async (req, res) => {
    try {
        const parent = await ParentModel.findById(req.params.parentId);
        if (!parent) {
            return res.status(404).json({ message: "Aucun parent trouvé avec cet ID." });
        }
        res.status(200).json(parent);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations du parent par ID :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des informations du parent." });
    }
};

exports.updateparentbyid = async (req, res) => {
    const parentId = req.params.parentId;
    const { nom, prenom,numero,matriculeeleve, nomeleve, prenomeleve /* ajoutez d'autres champs ici */ } = req.body;

    try {
        const parent = await ParentModel.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: "Aucun parent trouvé avec cet ID." });
        }

        // Mettez à jour les champs du parent avec les nouvelles valeurs
        parent.nom = nom;
        parent.prenom = prenom;
        parent.numero = numero;
        parent.matriculeeleve = matriculeeleve;
        parent.nomeleve = nomeleve;
        parent.prenomeleve = prenomeleve;

        // Mettez à jour d'autres champs du parent si nécessaire

        // Enregistrez les modifications dans la base de données
        await parent.save();

        res.status(200).json({ message: "Informations du parent mises à jour avec succès." });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des informations du parent :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des informations du parent." });
    }
};
exports.allparents = async (req, res) => {
   
        try {
          // Récupérer tous les parents depuis la base de données
          const allParents = await ParentModel.find();
          res.status(200).json(allParents);
        } catch (error) {
          console.error('Erreur lors de la récupération de tous les parents:', error);
          res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de tous les parents." });
        }
      };
      exports.updateParentById = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedParent = await ParentModel.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(updatedParent);
        } catch (error) {
            console.error('Erreur lors de la modification du parent :', error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la modification du parent.' });
        }
    };
    
    exports.deleteParentById = async (req, res) => {
        try {
            const { id } = req.params;
            await ParentModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Parent supprimé avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la suppression du parent :', error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du parent.' });
        }
    };
    exports.sendPasswordByEmailParent = async (req, res) => {
        const { email } = req.body;
      
        if (!email) {
          return res.status(400).json("Veuillez fournir une adresse email");
        }
      
        try {
          const parent = await ParentModel.findOne({ email: email });
      
          if (parent) {
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
              text: 'Créez votre nouveau mot de passe à partir de ce lien => http://localhost:3001/moudifier_pawwsord_parent'
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
      exports.updatePasswordByEmailParent = async (req, res) => {
        const email = req.params.email;
        const { password } = req.body;
      
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
      
            const parent = await ParentModel.findOneAndUpdate({ email: email }, { password: hashedPassword });
      
            if (parent) {
                res.status(200).json("Mot de passe mis à jour avec succès");
            } else {
                res.status(404).json("Aucun utilisateur trouvé avec cet e-mail");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe :", error);
            res.status(500).json("Une erreur s'est produite lors de la mise à jour du mot de passe");
        }
      };