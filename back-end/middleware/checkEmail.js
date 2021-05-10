var validator = require("email-validator");
 
validator.validate("test@email.com"); // true

module.exports =(req, res, next) => {
    const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

 if (!validator.validate(req.body.email) || !validateEmail.test(req.body.email)) {
    res.writeHead(400, '{"message":"Veuillez utiliser un email valide !"}', {
        'content-type': 'application/json',
    });
    res.end('Email invalid');
} else {
    next();
}
};