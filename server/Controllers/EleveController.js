
const cors = require('cors'); 
const EleveModel =require('../Models/eleve');
//fonction ajouter les utilisateurs
exports.AjouterEleve = async (req, res) => {
  console.log(req.body);
  const eleveObj = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      numero: req.body.numero,
      datenai: req.body.datenai,
      gouvernonat: req.body.gouvernonat,
      classe : req.body.classe,
      email: req.body.email,
      password: req.body.password
  }
 

  // Vérifier si le type est valide
  

  try {
      const eleve = new EleveModel(eleveObj);
      const createdEleve = await eleve.save();
      return res.status(200).json({ createdEleve });
      // Insertion des données dans la base de données
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
}

exports.LoginEleve = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
      return res.status(400).json("Email field is required");
  }

  try {
      const eleve = await EleveModel.findOne({ email: email });

      if (eleve) {
          if (eleve.password === password) {
              res.json("Success");
          } else {
              res.json("The password is incorrect");
          }
      } else {
          res.json("EmailNotExist");
      }
  } catch (error) {
      console.error(error);
      res.status(500).json("An error occurred");
  }
}
exports.ForgetPassword = async (req, res) => {
  const {email} = req.body;
    EleveModel.findOne({email: email})
    .then(eleve => {
        if(!eleve) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: eleve._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              eleve: 'youremail@gmail.com',
              pass: 'your password'
            }
          });
          
          var mailOptions = {
            from: 'hachem.matboouii@gmail.com',
            to: 'user email@gmail.com',
            subject: 'Reset Password Link',
            text: `http://localhost:5173/reset_password/${eleve._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
}
exports.AfficherEleve =async (req, res) => {
  const eleveId = req.params.id;

  try {
    const eleve = await EleveModel.findById(eleveId);
    if (eleve) {
      console.log("Utilisateur trouvé :", eleve);
      return res.status(200).json({ eleve });
    } else {
      console.log("Utilisateur non trouvé");
      return res.status(404).send("Utilisateur non trouvé");
    }
  } catch (error) {
    console.log("Erreur de recherche de l'utilisateur :", error);
    return res.status(500).send("Erreur de recherche de l'utilisateur");
  }
}

  //fonction pour afficher les  utilisateurs
/*exports.AfficherUsers = async (req,res)=>{
    try {
        const userList = await UserModel.find({}).exec();
        return res.status(200).json({ userList });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
//fonction pour afficher un seule utilisateur
exports.AfficherUser =async (req, res) => {
        const userId = req.params.id;
      
        try {
          const user = await UserModel.findById(userId);
          if (user) {
            console.log("Utilisateur trouvé :", user);
            return res.status(200).json({ user });
          } else {
            console.log("Utilisateur non trouvé");
            return res.status(404).send("Utilisateur non trouvé");
          }
        } catch (error) {
          console.log("Erreur de recherche de l'utilisateur :", error);
          return res.status(500).send("Erreur de recherche de l'utilisateur");
        }
      }
//fonction pour supprimer un utilisateur
exports.SupprimerUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await UserModel.findOneAndDelete({ _id: userId });
      if (deletedUser) {
        console.log("Utilisateur supprimé :", deletedUser);
        return res.status(200).send("Suppression réussie");
      } else {
        console.log("Utilisateur non trouvé");
        return res.status(404).send("Utilisateur non trouvé");
      }
    } catch (error) {
      console.log("Erreur de suppression :", error);
      return res.status(500).send("Erreur de suppression");
    }
  }
//fonction pour modifier un utilisateur 
exports.ModifierUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (updatedUser) {
        console.log("Utilisateur modifié :", updatedUser);
        return res.status(200).json({ updatedUser });
      } else {
        console.log("Utilisateur non trouvé");
        return res.status(404).send("Utilisateur non trouvé");
      }
    } catch (error) {
      console.log("Erreur de modification :", error);
      return res.status(500).send("Erreur de modification");
    }
  }
  
  //fonction qui affiche les utilisateurs par type
  exports.AfficherUsersParType = async (req, res) => {
    const { type } = req.params; // On suppose que le type est passé en tant que paramètre dans l'URL

    try {
        // Vérifier si le type est valide
        if (type !== "eleve" && type !== "enseignant") {
            return res.status(400).json({ error: "Le type d'utilisateur doit être 'eleve' ou 'enseignant'." });
        }

        // Recherche des utilisateurs par type
        const users = await UserModel.find({ type }).exec();

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
*/
