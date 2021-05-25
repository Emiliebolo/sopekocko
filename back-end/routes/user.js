// différentes routes avec les fonctions qui s'appliquent aux utilisateurs 

/* importation framework express */
const express = require('express');

/* appel au router avec express */
const router = express.Router();

// On ajout maintenant les middlewares

/* passeword */
const checkPassword = require('../middleware/checkPassword');

/* Email */
const checkEmail = require('../middleware/checkEmail');

const userCtrl = require('../controllers/user');

/* Création des routes inscription et de connexion */
/* Permet de chiffret le password et de l'ajouterutilisateur à la base de donnée */
router.post('/signup', checkPassword, checkEmail, userCtrl.signup);

router.post('/login', checkEmail, userCtrl.login);

module.exports = router;