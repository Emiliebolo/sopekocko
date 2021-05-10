/* la partie du fichier app.js contient le corps de notre application*/

/* Importation framework express */
const express = require('express');

/*Aprés installation de mongoose importation du package pour se connecter à la base de donnée mongo db*/
const mongoose = require('mongoose');


/* Helmet est un middleware de type Connect , qui est compatible avec des frameworks comme Express */
const helmet = require('helmet');

/* package express-session */

/* importation de la route pour les sauces */
const sauceRoutes = require('./routes/sauce');

/* importation de la route utilisateur */
const userRoutes = require('./routes/user');

require('dotenv').config();

/* Const de application express */
const app = express();

/* Mise en place du middleware pour acceder à l'API */

mongoose.connect('mongodb+srv://smouflette13:Guimauve13@cluster0.dyxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
}); 
/*const cors = require('cors')
 
app.use(cors()) */


/* Transforme le corps de la requête en un objet JSON */
app.use(express.json());

/* Helmet est un middleware de type Connect , qui est compatible avec des frameworks comme Express */
app.use(helmet());

/* Mise ne place de la route des sauces */
app.use('/api/sauce', sauceRoutes);

/* Mise en place de la route des utilisateurs */
app.use('/api/auth', userRoutes);

/* On export l'application express pour y accéder depuis le server */

module.exports = app;