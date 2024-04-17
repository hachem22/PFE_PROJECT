// middleware/authenticateJWT.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Accès non autorisé. Jeton JWT manquant." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Accès non autorisé. Jeton JWT invalide." });
  }
};

module.exports = authenticateJWT;
