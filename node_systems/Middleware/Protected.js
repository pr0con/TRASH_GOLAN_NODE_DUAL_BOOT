const utils = require('../utilz.js'); 
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler.js');
const Users = require('../Models/UsersModel.js');

exports.Protected = asyncHandler(async (req, res, next) => {
	console.log(req.headers.origin);
	console.log(req.cookies.token);
	
	
	let token = (req.cookies.token) ? req.cookies.token : null;
	if(token === null || token === 'undefined') {
		return res.status(401).json({ success: false, message: 'Unauthorized Access. (Possible Missing Token or Expired Token)' });
	}
	try {
		var legit = jwt.verify(token, utils.jwtPublicKey, utils.system_configuration['system']['oauth']['verify_options']);
		console.log("\nJWT verification result: " + JSON.stringify(legit));	
		
		req.user = await Users.findById(legit.user._id); //used for Role below...
		return next();
	} catch(err) {
		console.log('@verify token: ',err)
		return res.status(401).json({ success: false, message: 'Unauthorized Access.' })		
	}
	//should not get here but whatever...
	return res.status(401).json({ success: false, message: 'Unauthorized Access.' })	
});

exports.Role = (roles) => {
	return (req,res,next) => {
		if(!roles.includes(req.user.role)) {
			return res.status(401).json({ success: false, message: 'Unauthorized Role.' });
		}
		next()
	}
}