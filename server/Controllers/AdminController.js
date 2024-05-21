const Admin = require('../Models/Admin');
const bcrypt = require('bcrypt');

exports.registerAdmin = async (req, res) => {
  try {
    // Vérifier si l'e-mail existe déjà
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Cet e-mail est déjà utilisé." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Créer un nouvel administrateur
    const admin = new Admin({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hashedPassword
    });

    await admin.save();
    res.status(201).json({ message: "Administrateur créé avec succès." });
  } catch (error) {
    console.error('Erreur lors de l\'inscription de l\'administrateur :', error);
    res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription." });
  }
};


// Connexion de l'administrateur
exports.loginAdmin = async (req, res) => {
  try {
    // Convertir l'email et le mot de passe en minuscules
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();

    // Recherche de l'administrateur par email (après normalisation)
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }

    // Vérification du mot de passe (après normalisation)
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }

    res.status(200).json({ message: "Connexion réussie." });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'administrateur :', error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la connexion." });
  }
};


