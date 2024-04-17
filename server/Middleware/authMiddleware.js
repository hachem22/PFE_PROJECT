const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authMiddleware = (req, res, next) => {
  // Récupérer le jeton JWT de l'en-tête Authorization
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }

  // Vérifier et décoder le jeton
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide' });
    }
    
    // Ajouter les informations de l'utilisateur décodées à l'objet de demande
    req.user = decodedToken;
    next(); // Passer au prochain middleware ou contrôleur
  });
};

module.exports = authMiddleware;