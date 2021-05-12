//* Création d'un server node avec le code suivant *//

/* Importation du package HTTP natif de node */
var http = require('http');

/* Importation de app permettant l'utilisation sur le server*/
const app = require('./app');

const cors = require('cors');


/* Ajout du package dotenv servant à masquer les informations de connexion à la base de donnée */
require('dotenv').config();

/* La fonction normalizePort (val) normalise simplement un port en un nombre, une chaîne .*/
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
/* Lorsque aucun port n'est précisé on procédera avec le port 3000*/
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/*la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur*/
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* Création d'un serveur apres l'installation du framework express */
const server = http.createServer(app);

/* Lancement du serveur avec le port dédié */
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
app.use(cors());

/* le server écoute le port écrit ci-dessus*/
server.listen(port);
