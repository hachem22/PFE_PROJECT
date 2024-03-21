const EnseignantModel = require("../Models/Enseignant");

exports.AjouterEnseignant = async (req, res) => {
    console.log(req.body);
    const EnseignantObj = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero: req.body.numero,
       specialite:req.body.specialite,
        email: req.body.email,
        password: req.body.password
      
    }
   
  
    // Vérifier si le type est valide
    
  
    try {
        const Enseignant = new EnseignantModel(EnseignantObj);
        const createdEnseignant = await Enseignant.save();
        return res.status(200).json({ createdEnseignant });
        // Insertion des données dans la base de données
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
  }
  exports.LoginEnseignant = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email) {
        return res.status(400).json("Email field is required");
    }
  
    try {
        const Enseignant = await EnseignantModel.findOne({ email: email });
  
        if (Enseignant) {
            if (Enseignant.password === password) {
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