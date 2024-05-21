const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const CoursPDF = require('../Models/CoursPDF');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'cour_pdf/'); // Le dossier "cour_pdf" dans le dossier "server"
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Utilisez le nom original du fichier
    }
  });
  const upload = multer({ storage: storage });
  const EleveController =      require(path.join(__dirname, '../Controllers/EleveController'));
const ParentController =     require(path.join(__dirname, '../Controllers/ParentController'));
const EnseignantController = require(path.join(__dirname, '../Controllers/EnseignantController'));
const CourController =       require(path.join(__dirname, '../Controllers/CourController'));
const coursPdfController =   require(path.join(__dirname, '../Controllers/coursPdfController'));
const MessageController =    require(path.join(__dirname, '../Controllers/MessageController'));
const VideoSwatshedController = require (path.join(__dirname,'../Controllers/VideoSwatshedController'));
const AdminController         = require (path.join(__dirname,'../Controllers/AdminController'));
const ProgressionController = require(path.join(__dirname, '../Controllers/ProgressionContrller'));
const CommentController = require(path.join(__dirname, '../Controllers/CommentController'));


//courpdf route
router.post('/ajouter/cours', upload.single('fichierPdf'), coursPdfController.ajouterCours);
router.get('/allcourspdf', coursPdfController.getAllCours);
router.use('/pdf', express.static(path.join(__dirname, '../cour_pdf')));
router.get('/cour_pdf/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../cour_pdf', filename);
  res.sendFile(filePath);
});
router.get('/cours/:niveau', coursPdfController.getcourparniveau);

 
//eleve router
router.post("/register/eleve" , EleveController.registerEleve);
router.post("/Login/eleve", EleveController.loginEleve);
router.get("/getInfoById/:id", EleveController.getEleveById);
router.put('/updateProfileById/:id', EleveController.updateProfileById);
router.get('/getAllEleves', EleveController.getAllEleves);
router.delete('/deleteeleve/:id', EleveController.deleteparid);
router.put('/modifiereleve/:id', EleveController.modifierparid);
router.get('/elevebymatricule/:matricule', EleveController.getelevebymatricule);
router.post('/sendPasswordByEmail', EleveController.sendPasswordByEmail);
router.post('/checkEmail', EleveController.checkEmail);


//router.post('/getPasswordByEmail/:email', EleveController.getPasswordByEmail);
router.put('/updatePasswordByEmail/:email', EleveController.updatePasswordByEmail);
router.get('/eleves/:id/watchedVideos/:matiere',EleveController.getvideoswatchedbyMatiere);
router.post('/eleves/:id/watchedVideos/:matiere',EleveController.postvideoswatchedbyMatiere);
router.put('/eleves/:id/watchedVideos/:matiere',EleveController.putvideoswatchedbyMatiere);
//message route
router.post('/postMessageWithNomPrenom', MessageController.postMessageWithPhoto);
router.get('/getAllMessages', MessageController.getAllMessagesWithInfo);
//parent route
router.get('/parentbyid/:parentId', ParentController.parentbyid);
router.put('/updateparent/:parentId', ParentController.updateparentbyid);
router.get('/getAllParents', ParentController.allparents);
router.put('/updateParentById/:id', ParentController.updateParentById);
router.delete('/deleteParentById/:id', ParentController.deleteParentById);
router.post("/Login/parent" , ParentController.LoginParent);
router.post("/ajouter/parent", ParentController.AjouterParent);
router.get("/verifierEmailParent/:email", ParentController.verifierEmailParent);
router.post("/sendPasswordByEmailParent", ParentController.sendPasswordByEmailParent);
router.put('/updatePasswordByEmailParent/:email', ParentController.updatePasswordByEmailParent);


//cour route
router.delete("/deleteCours", CourController.deleteCours);
router.put("/updateCoursById/:id", CourController.ModifierCour);
router.post("/AjouterCour", CourController.AjouterCour);
router.get("/getAllCours", CourController.getAllCours);
router.get("/cours/:niveau/:matiere", CourController.getCoursByNiveauAndMatiere);
//enseignant route
router.post("/ajouter/Enseignant", EnseignantController.AjouterEnseignant);
router.get("/verifierEmailEnseignant/:email", EnseignantController.verifierEmailEnseignant);
router.get("/getenseignantparId/:EnseignantId", EnseignantController.getenseignantparId);
router.post("/Login/Enseignant", EnseignantController.loginEnseignant);
router.get("/getAllEnseignants", EnseignantController.getAllEnseignants);
router.delete('/deleteEnseignantById/:id', EnseignantController.deleteEnseignantById);
router.put('/updateEnseignantById/:id', EnseignantController.updateEnseignantById);
router.put('/updateEnseignantbyId/:EnseignantId', EnseignantController.updateEnseignantbyId);
router.post('/sendPasswordByEmailEnseignant', EnseignantController.sendPasswordByEmailEnseignant);
router.put('/updatePasswordByEmailEnseignant/:email', EnseignantController.updatePasswordByEmailEnseignant);

//progression
router.get('/progression/:matiere/:niveau/:eleveId', VideoSwatshedController.getProgression);
router.post('/progression', VideoSwatshedController.saveProgression);
//router.put('/eleves/:eleveId/progression/:matiere', EleveController.putprogressioneleveparmatiere);
//const progressionController = require('../controllers/progressionController');
router.get('/progression/:eleveId', ProgressionController.getProgressionById);
router.get('/progression/matricule/:matricule', ProgressionController.getProgressionByMatricule);

// Mettre à jour la progression de l'élève pour une matière spécifique
router.put('/eleves/:eleveId/:matricule/progression/:matiere', ProgressionController.putprogressioneleveparmatiere);

router.post('/admin/register', AdminController.registerAdmin);
router.post('/admin/login', AdminController.loginAdmin);
//commentaire routes
router.get('/comments/:videoUrl', CommentController.getCommentsByVideo);
router.post('/comments', CommentController.createComment);


module.exports = router;
