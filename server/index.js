// Importer le module dotenv et charger les variables d'environnement à partir du fichier .env
require('dotenv').config();

const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");

// Créer une instance de l'application Express
const app = express();


// Configurer les middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Définir les routes
const userRoute = require('./Routes/userRoute.js');
app.use('/', userRoute);
/*const eleveRoute = require('./Routes/eleveRoute.js');
app.use('/', eleveRoute);
const parentRoute = require('./Routes/parentRoute.js');
app.use('/parent', parentRoute);*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'cour_pdf/'); // Le dossier "cour_pdf" dans le dossier "server"
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom original du fichier
  }
});

// Configurer multer avec la configuration de stockage
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log('Connexion à la base de données réussie');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1); // Quitte l'application en cas d'erreur de connexion
  }
};

connectDB();

// Démarre le serveur Express
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
