// validator.js

const { body, validationResult } = require('express-validator');

// Middleware de validation des données d'inscription pour les élèves
exports.validateRegisterData = [
  body('nom').trim().isLength({ min: 2, max: 20 }).withMessage('Le nom doit comporter entre 2 et 20 caractères.'),
  body('prenom').trim().isLength({ min: 2, max: 20 }).withMessage('Le prénom doit comporter entre 2 et 20 caractères.'),
  body('email').trim().isEmail().withMessage('Veuillez entrer une adresse e-mail valide.'),
  body('password').trim().isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères.'),
  // Ajoutez d'autres validations pour les champs supplémentaires (numéro, date, etc.)
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
