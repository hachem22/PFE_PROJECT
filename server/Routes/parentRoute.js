const express = require('express');
const router = express.Router();
const ParentController = require(path.join(__dirname, '../Controllers/ParentController'));

router.post("/Login/parent", ParentController.LoginParent);
router.post("/ajouter/parent", ParentController.AjouterParent);

module.exports = router;