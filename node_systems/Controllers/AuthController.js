const utils = require('../utilz.js');
const crypto = require('crypto');
const asyncHandler = require('../Middleware/asyncHandler.js');
const Users = require('../Models/UsersModel.js');

exports.login = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;
	if(!username || !password) { return res.status(400).json({ success: false, message: 'Server needs username && password.' }); }

	/* Note user could be email or username */
	const user = await Users.findOne({ '$or': [ {username: username}, { email: username }]}).select('+password');
	
	if(!user) {
		return res.status(400).json({ success: false, message: 'User not found' });
	}
	
	
	if(await user.validatePassword(password, user['password'])) {
		user['password'] = 'F00';
		sendCookieToken(user,200,res)			
	} else {
		return res.status(400).json({ success: false, message: 'Something went horribly wrong.' });
	}		
});

exports.register = asyncHandler(async (req, res, next) => {
	const { username, email, password } = req.body;
	
	const user = await Users.create({
		username,
		email,
		password,
	});
	
	if(!user) {
		return res.status(400).json({ success: false, message: 'Registration Failed.' });
	}
	
	user['password'] = 'F00';
	sendCookieToken(user,200,res);
});


const sendCookieToken = (user, status, res) => {
	const token = user.getSignedJwtToken(user);
	const options = {
		expires: new Date(Date.now() + utils.system_configuration['system']['oauth']['cookie_options']['expires']),
		secure: true,
		httpOnly: true, //Note we need withCredential in axios call	
	};
	res.status(status).cookie('token', token, options).json({ success: true, user, token });
}

exports.validateCookieToken = asyncHandler(async (req,res,next) => {
	if('user' in req) {
		return res.status(200).json({ success: true, message: 'Previous session token validated.', user: req.user, jwt: req.cookies.token });	
	}
	return res.status(400).json({ success: false, message: 'Previous session token dead.' });
});


exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {expires: new Date(Date.now()), httpOnly: true})

	return res.status(200).json({ success: true, message: 'Successfull Logout.' });
});

exports.recover = asyncHandler(async (req, res, next) => {
	const { username } = req.body;
	const user = await Users.findOne({ '$or': [ { username: username}, {email: username} ]})

	if(!user) {
		return res.status(400).json({ success: false, message: 'Something Went Wrong With Reset Request.' });	
	}
	
	
	const resetToken = user.generatePWDResetToken();
	await user.save({ validateBeforeSave: false });
	
	
	const msg = `
You are receiving this email because you (or someone else) has requested a password reset. If \n 
you did not make this request please ignore this email. Otherwise follow the link provided below. \n
\n
https://trash.pr0con.io?prt=${resetToken}
	`;
	
	try {
		await utils.sendResetPasswordEmail({
			to: user['email'],
			body: msg
		});
				
		return res.status(200).json({ success: true, message: 'Validation Token Sent via email.' });
	} catch(error) {
		console.log(error);
		
		user.resetPasswordToken = '';
		user.resetPasswordExpire = '';
		await user.save({ validateBeforeSave: false });
		
		return res.status(400).json({ success: false, message: 'Something Went Wrong With Reset Request.' });			
	}						
});

exports.reset = asyncHandler(async (req,res,next) => {
	const rpt = crypto.createHash('sha256').update(req.params.token).digest('hex');
	const user = await Users.findOne({ resetPasswordToken: rpt, resetPasswordExpire: { $gt: Date.now() }});	
	
	//console.log(user);
	if(!user) {
		return res.status(400).json({ success: false, message: 'Link Expired or something else went wrong.' });	
	}
	
	user.password = req.body.password;
	user.resetPasswordToken = '';
	user.resetPasswordExpire = '';	

	await user.save();
	res.status(200).json({ success: true, message: 'Password reset successful.' });			
});







