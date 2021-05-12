
// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

//* *****Ajout des middlewares***** *//

// Importation du  middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');
//Importation du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');
// Importation du middleware checkSauce  pour la validation des champs lors de la saisie de la sauce
const checkSauce = require('../middleware/checkSauce');

// On associe les fonctions aux différentes routes, 
const saucesCtrl = require('../controllers/sauces');

//* *****Création des différentes ROUTES de l'API //

// les routes doivent être dans l'ordre 


router.post('/', auth, multer, saucesCtrl.createSauce);  // Route qui permet de créer une sauce

router.put('/:id', auth, checkSauce, multer, saucesCtrl.modifySauce);  // Route qui permet de modifier une sauce

router.delete('/:id', auth, saucesCtrl.deleteSauce);  // Route qui permet de supprimer une sauce

router.get('/:id', auth, saucesCtrl.getOneSauce);  // Route qui permet de récupérer une seule sauce

router.get('/', auth, saucesCtrl.getAllSauce);  // Route qui permet de récupérer toutes les sauces

router.post('/:id/like', auth, saucesCtrl.likeDislikeSauce); // Route qui permet de liker ou disliker une sauce

// Exports du router
module.exports = router;