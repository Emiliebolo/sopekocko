/* nous allons implémenter des téléchargements de fichiers pour que les utilisateurs puissent télécharger des images */
 //  Pour ce faire, nous utiliserons multer , un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP.

 const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');