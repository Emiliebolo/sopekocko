/* la partie du fichier app.js contient le corps de notre application*/

/* Importation framework express */
const express = require('express');

const bodyParser = require('body-parser');

/*Aprés installation de mongoose importation du package pour se connecter à la base de donnée mongo db*/
const mongoose = require('mongoose');


/* Helmet est un middleware de type Connect , qui est compatible avec des frameworks comme Express */
const helmet = require('helmet');//Configure de manière appropriée des en-têtes HTTP pour protéger l'application

/* package express-session */
//var session = require('express-session');// Pour éviter que les cookies n'ouvrent pas l'application aux attaques

/* importation de la route pour les sauces */
const saucesRoutes = require('./routes/sauces');

/* importation de la route utilisateur */
const userRoutes = require('./routes/user');

/*traiter les requêtes vers la route image en rendant notre dossier images statique */
const path = require('path');


require('dotenv').config();

/* Const de application express */
const app = express();
 

/* Mise en place de la base de donnée pour acceder à l'API */

mongoose.connect('mongodb+srv://smouflette:Guimauveprod13@cluster0.xnz9b.mongodb.net/SCRAM?retryWrites=true&w=majority',
  {
    useCreateIndex: true,
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


/* Transforme le corps de la requête en un objet JSON */
app.use(bodyParser.json());

/* Helmet est un middleware de type Connect , qui est compatible avec des frameworks comme Express */
app.use(helmet());


app.use('/images',express.static(path.join(__dirname,'images')))

// Routes dédiées aux sauces
app.use('/api/sauces', saucesRoutes);

// Routes dédiées aux users
app.use('/api/auth', userRoutes);

// Export de l'application express pour y accéder depuis server.js
module.exports = app;