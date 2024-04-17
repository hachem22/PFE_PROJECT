const express = require('express');
const router = express.Router();
const path = require('path');

//const authMiddleware = require('../Middleware/authMiddleware.js');
const EleveController =      require(path.join(__dirname, '../Controllers/EleveController'));
const ParentController =     require(path.join(__dirname, '../Controllers/ParentController'));
const EnseignantController = require(path.join(__dirname, '../Controllers/EnseignantController'));
const CourController =       require(path.join(__dirname, '../Controllers/CourController'));
const coursPdfController =   require(path.join(__dirname, '../Controllers/coursPdfController'));
const MessageController =    require(path.join(__dirname, '../Controllers/MessageController'));

router.post("/Login/parent" , ParentController.LoginParent);
router.post("/ajouter/parent", ParentController.AjouterParent);
router.post("/ajouter/Enseignant", EnseignantController.AjouterEnseignant);
router.post("/Login/Enseignant", EnseignantController.loginEnseignant);
router.post("/AjouterCour", CourController.AjouterCour);
router.get("/getAllCours", CourController.getAllCours);
router.get("/cours/:niveau/:matiere", CourController.getCoursByNiveauAndMatiere);
//router.get("/verifierEmail/:email", EleveController.verifierEmail);
router.get("/verifierEmailEnseignant/:email", EnseignantController.verifierEmailEnseignant);
router.get("/verifierEmailParent/:email", ParentController.verifierEmailParent);
router.post('/AjouterCoursPDF', coursPdfController.ajouterCoursPDF);

router.post("/register/eleve" , EleveController.registerEleve);
router.post("/Login/eleve", EleveController.loginEleve);
router.get("/getInfoById/:id", EleveController.getEleveById);
router.put('/updateProfileById/:id', EleveController.updateProfileById);
router.post('/postMessageWithNomPrenom', MessageController.postMessageWithPhoto);
router.get('/getAllMessages', MessageController.getAllMessagesWithInfo);
router.get('/getAllEleves', EleveController.getAllEleves);
router.delete('/deleteeleve/:id', EleveController.deleteparid);
router.put('/modifiereleve/:id', EleveController.modifierparid);
router.get('/elevebymatricule/:matricule', EleveController.getelevebymatricule);
router.get('/parentbyid/:parentId', ParentController.parentbyid);
router.post('/sendPasswordByEmail/:email', EleveController.sendPasswordByEmail);
router.post('/getPasswordByEmail/:email', EleveController.getPasswordByEmail);
router.put('/updatePasswordByEmail/:email', EleveController.updatePasswordByEmail);
router.put('/updateparent/:parentId', ParentController.updateparentbyid);
router.get('/getAllParents', ParentController.allparents);
router.put('/updateParentById/:id', ParentController.updateParentById);
router.delete('/deleteParentById/:id', ParentController.deleteParentById);
router.delete("deleteCoursById/:id", CourController.SupprimerCour);
router.put("updateCoursById/:id", CourController.ModifierCour);
router.delete("/deleteCours", CourController.deleteCours);
router.get("enseignantparId/:enseignantId", EnseignantController.enseignantparId);


module.exports = router;
