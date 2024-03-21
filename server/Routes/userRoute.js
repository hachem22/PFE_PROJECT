const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const EleveController = require(path.join(__dirname, '../Controllers/EleveController')) ;
const ParentController = require(path.join(__dirname, '../Controllers/ParentController')) ;
const EnseignantController = require(path.join(__dirname, '../Controllers/EnseignantController')) ;
const CourController= require(path.join(__dirname, '../Controllers/CourController')) ;

router.post("/Login/parent", ParentController.LoginParent) ;
router.post("/ajouter/parent", ParentController.AjouterParent) ;
router.post("/ajouter/eleve", EleveController.AjouterEleve) ;
router.post("/ajouter/Enseignant", EnseignantController.AjouterEnseignant) ;
router.post("/Login/Enseignant", EnseignantController.LoginEnseignant) ;
router.post("/AddCours",upload.single('video'), CourController.AddCours) ;
router.get("/allCours", CourController.getAllCours) ;
router.get("/allCours", CourController.getAllCours) ;

router.post("/Login/eleve", EleveController.LoginEleve);

router.get("eleve/:id", EleveController.AfficherEleve);
/*router.get("/lister", UserController.AfficherUsers);
router.get("/:id", UserController.AfficherUser);
router.delete("/:id/supprimer", UserController.SupprimerUser);
router.put("/:id/modifier", UserController.ModifierUser);
router.get("/afficher/:type",UserController.AfficherUsersParType);*/
module.exports = router;