const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fonction pour créer un token JWT
exports.createToken = (user) => {
  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
};

// Fonction pour vérifier un token JWT
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Fonction pour hasher un mot de passe
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Fonction pour comparer un mot de passe avec sa version hachée
exports.comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
