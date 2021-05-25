// Récupération du modèle sauce
const Sauce = require('../models/Sauce');

// Récupération du package file system permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs');

//* *****Première partie création d'une nouvelle sauce***** *//

exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);// Nouvel object 'sauceObject' va permettre de stocker les données envoyées par le front-end 
	delete sauceObject._id;// Supprime l'id généré envoyé par le frond-end
	const name = sauceObject.name; // essayer sauceObject.name
	const sauce = new Sauce({ // Création d'une instance 
		...sauceObject,
		name: name,
		// Opérateur spread permet de faire une copie de tous les éléments de req.body
		imageUrl: `${req.protocol}://${req.get('host')}/images/${// on traite l'image 
			req.file.filename
		}`,
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: [],
	});
	Sauce.findOne({
		name: name.toLowerCase(),
	}).then(sauces => 
		{console.log(sauces)})
.catch(error => res.status(400).json({ error }));
		
	

	const validateSauce = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.?!,_\s-]{3,150}$/;// permet de valider  les champ de saisie avec la méthod regex
	if (
		!validateSauce.test(sauceObject.name) ||
		!validateSauce.test(sauceObject.manufacturer) ||
		!validateSauce.test(sauceObject.description) ||
		!validateSauce.test(sauceObject.mainPepper)
	) {
		const filename = sauce.imageUrl.split('/images/')[1];
		fs.unlinkSync(`images/${filename}`);
		res.writeHead(
			400,
			'{"message":"Vous devez utiliser entre 3 et 150 caractères, et ne pas utiliser de caractères spéciaux !"}',
			{
				'content-type': 'application/json',
			},
		);
		res.end('Format sauce incorrect !');
	} else {
		sauce // Si aucune erreur sauvegarde la sauce dans la base de donnée
			.save()
			.then(() => res.status(201).json({ message: 'Objet renregistré !' }))//la méthode save() renvoie une promise avec une réponse 201
			.catch(error => res.status(400).json({ error }));// nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400
	}
};

//* *****Modification  d'une sauce***** *//

exports.modifySauce = (req, res, next) => {
	let sauceObject = {}; // Création d'un objet qui va demander si req.file existe
	req.file
		? (Sauce.findOne({// Elle existe  on traite la nouvelle image 
				_id: req.params.id,
		  }).then(sauce => {
				const filename = sauce.imageUrl.split('/images/')[1];
				fs.unlinkSync(`images/${filename}`);
		  }),
		  (sauceObject = {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${
					req.file.filename
				}`,
		  }))
		: (sauceObject = {
				...req.body,
		  });
	Sauce.updateOne( // on effectue la modification apportée à la sauce 
		{
			_id: req.params.id,
		},
		{
			...sauceObject,
			_id: req.params.id,
		},
	)
		.then(() =>
			res.status(200).json({
				message: 'Sauce modifiée !',
			}),
		)
		.catch(error =>
			res.status(400).json({
				error,
			}),
		);
};

//* *****Suppression d'une sauce***** *//

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }) //  On supprime le fichier image à l'aide de URl de la base 
		.then(sauce => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {// fonction unlik supprime le fichier 
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Objet supprimé !' }))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.status(500).json({ error }));
};


//* *****Récupération de la sauce***** *//

exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })// Récupère une entité par son identifiant
		.then(sauce => res.status(200).json(sauce))
		.catch(error => res.status(404).json({ error }));
};


//* *****Permet de récupérer toutes les sauces***** *//

Sauce.find();// find permet de récuperer toutes les sauces de la base 
exports.getAllSauce = (req, res, next) => {
	Sauce.find()
		.then(sauce => res.status(200).json(sauce))
		.catch(error => res.status(400).json({ error }));
};


//* *****Permet de liker, disliker une sauce***** *//
exports.likeDislikeSauce = (req, res, next) => {
	
	if (req.body.like === 1) {// si il s'agit bien d'un like 
		Sauce.updateOne(
			{
				_id: req.params.id,
			},
			{
				$push: {
					usersLiked: req.body.userId,// push l'utilisateur 
				},
				$inc: {
					likes: +1,// incrémente un like de +1
				},
			},
		)
			.then(() =>
				res.status(200).json({
					message: " Votre j'aime est ajouté !",
				}),
			)
			.catch(error =>
				res.status(400).json({
					error,
				}),
			);
	}
	
	
	if (req.body.like === -1) {// il s'agit bien d'un dislike
		Sauce.updateOne(
			{
				_id: req.params.id,
			},
			{
				$push: {
					usersDisliked: req.body.userId, // on push l'utilisateur 
				},
				$inc: {
					dislikes: +1,// on ajoute un dislikes 
				},
			},
		)
			.then(() => {
				res.status(200).json({
					message: 'Votre like est bien supprimé !',
				});
			})
			.catch(error =>
				res.status(400).json({
					error,
				}),
			);
	}
	
	if (req.body.like === 0) {// on souhaite annuler un like
		Sauce.findOne({
			_id: req.params.id,
		})
			.then(sauce => {
				if (sauce.usersLiked.includes(req.body.userId)) {
					Sauce.updateOne(
						{
							_id: req.params.id,
						},
						{
							$pull: {
								usersLiked: req.body.userId,
							},
							$inc: {
								likes: -1,// aprés le pull on enleve  le like de l'utilisateur 
							},
						},
					)
						.then(() =>
							res.status(200).json({
								message: 'Votre like est bien retiré !',
							}),
						)
						.catch(error =>
							res.status(400).json({
								error,
							}),
						);
				}
				
				if (sauce.usersDisliked.includes(req.body.userId)) {// annuler un dislike
					Sauce.updateOne(
						{
							_id: req.params.id,
						},
						{
							$pull: {
								usersDisliked: req.body.userId,
							},
							$inc: {
								dislikes: -1, // supprime le dislike
							},
						},
					)
						.then(() =>
							res.status(200).json({
								message: 'Votre dislike est bien retiré !',
							}),
						)
						.catch(error =>
							res.status(400).json({
								error,
							}),
						);
				}
			})
			.catch(error =>
				res.status(404).json({
					error,
				}),
			);
	}
};