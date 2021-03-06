
const User = require('../models/user');

const bcrypt = require('bcrypt');

const jsonWebToken = require ('jsonwebtoken');

//const passwordValidator = require('password-validator');

const maskData = require('maskdata');


require('dotenv').config();


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const maskdata = maskData.maskEmail2(req.body.email);
        const user = new User({
          email: maskdata,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    const maskdata = maskData.maskEmail2(req.body.email)
    User.findOne({ email: maskdata })
      .then(user => {
        console.log(user);
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jsonWebToken.sign({ userId: user._id },process.env.JWT_TOKEN,
                { expiresIn: '1h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };