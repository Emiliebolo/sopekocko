

module.exports = (req, res, next) => {
    const validateSauce = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.?!,_\s-]{3,150}$/;
	if (
		!validateSauce.test(req.body.name) ||
		!validateSauce.test(req.body.manufacturer) ||
		!validateSauce.test(req.body.description) ||
		!validateSauce.test(req.body.mainPepper)
	) {
		res.writeHead(
			400,
			'{"message":"Vous devez utiliser entre 3 et 150 caractères, et ne pas utiliser de caractères spéciaux !"}',
			{
				'content-type': 'application/json',
			},
		);
		res.end('Format sauce incorrect !');
	} else {
		next();
	}
};
    
