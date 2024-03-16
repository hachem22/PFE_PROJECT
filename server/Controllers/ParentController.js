const ParentModel =require('../Models/parent');
//fonction ajouter les utilisateurs
exports.AjouterParent = async (req, res) => {
  console.log(req.body);
  const parentObj = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      numero: req.body.numero,
      matriculeeleve: req.body.matriculeeleve,
      nomeleve: req.body.nomeleve,
      prenomeleve : req.body.prenomeleve,
      email: req.body.email,
      password: req.body.password
  }

  // Vérifier si le type est valide
  

  try {
      const parent = new ParentModel(parentObj);
      const createdParent = await parent.save();
      return res.status(200).json({ createdParent });
      // Insertion des données dans la base de données
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
}

exports.LoginParent = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email) {
        return res.status(400).json("Email field is required");
    }
  
    try {
        const parent = await ParentModel.findOne({ email: email });
  
        if (parent) {
            if (parent.password === password) {
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