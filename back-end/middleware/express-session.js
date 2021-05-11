
/* une personne potentiellement malveillante peut l’utiliser pour s’identifier auprès du serveur et cibler ses attaques en conséquence.

Pour éviter ce problème, utilisez des noms de cookie génériques, par exemple à l’aide du middleware express-session */

var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
