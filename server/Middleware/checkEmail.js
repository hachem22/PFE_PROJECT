// middleware/checkEmail.js
const EleveModel = require('../Models/Eleve');

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const existingEleve = await EleveModel.findOne({ email });
  if (existingEleve) {
    return res.status(400).json({ error: "Cet email est déjà utilisé." });
  }
  next();
};

module.exports = checkEmail;
