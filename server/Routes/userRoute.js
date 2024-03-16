const express = require('express');
const router = express.Router();
const path = require('path'); 
const EleveController = require(path.join(__dirname, '../Controllers/EleveController')); 
const ParentController = require(path.join(__dirname, '../Controllers/ParentController'));

router.post("/Login/parent", ParentController.LoginParent);
router.post("/ajouter/parent", ParentController.AjouterParent);
router.post("/ajouter/eleve", EleveController.AjouterEleve);

router.post("/Login/eleve", EleveController.LoginEleve);

router.get("eleve/:id", EleveController.AfficherEleve);
/*router.get("/lister", UserController.AfficherUsers);
router.get("/:id", UserController.AfficherUser);
router.delete("/:id/supprimer", UserController.SupprimerUser);
router.put("/:id/modifier", UserController.ModifierUser);
router.get("/afficher/:type",UserController.AfficherUsersParType);*/
module.exports = router;