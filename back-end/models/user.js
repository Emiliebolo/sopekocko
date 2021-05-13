// Modèle de base de données pour les informations de nos utilisateurs

const mongoose = require('mongoose');

/* mongoose-unique-validator est un plugin qui ajoute une validation de pré-sauvegarde pour les champs uniques dans un schéma Mongoose.
Cela rend la gestion des erreurs beaucoup plus facile, car vous obtiendrez une erreur de validation Mongoose lorsque vous tenterez de violer une contrainte unique , plutôt qu'une erreur E11000 de MongoDB. */

var uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },// Pour s'assurer que les utilisateurs n'utilisent pas la même adresse on passe le mot-clé unique
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);