const multer = require('multer');

// Configuration de multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Spécifiez le répertoire de destination pour stocker les fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Générez un nom de fichier unique pour éviter les conflits
  }
});

const upload = multer({ storage: storage });
