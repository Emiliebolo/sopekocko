// in controllers/sauce.js
const Sauce = require('../models/Sauce');

const fs = require('fs');


  exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`,
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: [],
	});
	const validateSauce = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.?!,_\s-]{3}$/;
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
			'{"message":"Vous devez utiliser 3 caractères minimums, et ne pas utiliser de caractères spéciaux !"}',
			{
				'content-type': 'application/json',
			},
		);
		res.end('Format incorrect !');
  } else {
		sauce
			.save()
			.then(() => res.status(201).json({ message: 'Objet enregistré !' }))
			.catch(error => res.status(400).json({ error }));
	}
};

exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then(sauce => res.status(200).json(sauce))
		.catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
	let sauceObject = {};
	req.file
		? (Sauce.findOne({
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
	Sauce.updateOne(
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
				message: 'Modification de la sauce éfectuée avec succés !',
			}),
		)
		.catch(error =>
			res.status(400).json({
				error,
			}),
		);
}

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then(sauce => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Votre sauce à bien été supprimée !' }))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}; 

exports.likeDislikeSauce = (req, res, next) =>{
  /* Pour un like (+ 1)*/

  /* Pour un dislike (-1) */


}

