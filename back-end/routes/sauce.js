
/* Importation framework express*/
const express = require('express');

 /* router avec la méthode de express */
const router = express.Router();
/* Importation du middlewares auth , sécurise les routes*/
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const checkSauce = require('../middleware/checkSauce');

/* Importation du controllers pour les sauces*/
const saucesCtrl = require('../controllers/sauce');


/* Routes de l'API  avec les middlewares et controllers */
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, checkSauce, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/:id/like', auth, saucesCtrl.likeDislikeSauce);

/* export du router */
module.exports = router;