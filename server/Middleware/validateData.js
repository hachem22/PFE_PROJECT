// middleware/validateData.js
const validateData = (req, res, next) => {
    const { nom, prenom, numero, datenai, gouvernonat, classe, email, password } = req.body;
    if (!nom || !prenom || !numero || !datenai || !gouvernonat || !classe || !email || !password) {
      return res.status(400).json({ error: "Veuillez fournir toutes les informations nécessaires." });
    }
    next();
  };
  
  module.exports = validateData;
  