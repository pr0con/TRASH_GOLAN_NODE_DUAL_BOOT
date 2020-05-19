const utils = require('../utilz.js');
const asyncHandler = require('../Middleware/asyncHandler.js');
const Users = require('../Models/UsersModel.js');


exports.getUsers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.mongoResult);
});

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await Users.findById(req.params.id);
	
	res.status(200).json({ success: true, user: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
	await Users.findByIdAndDelete(req.params.id);
	
	res.status(200).json({ success: true });
});

exports.createUser = asyncHandler(async (req, res, next) => {
	const user = await Users.create(req.body);

	//may want to remove password from new user return
	res.status(201).json({success: true, data: user });	
});

exports.updateUser = asyncHandler(async (req, res, next) => {
	/* Challenge Remove Blank  Fields */
	(req.body['username'] == "") ? delete req.body.username : '';
	(req.body['email'] == "") ? delete req.body.email : '';
	(req.body['password'] == "") ? delete req.body.password : '';
	
	
	const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});
	
	res.status(200).json({ success: true, user: user });
});




/* Personal Profile UPdates*/
exports.updateProfile = asyncHandler(async (req, res, next) => {
	const user = await Users.findByIdAndUpdate(req.user._id, req.body, {
		new: true,
		runValidators: true
	});
	
	res.status(200).json({ success: true, user: user });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await Users.findById(req.user._id).select('+password');

	console.log(user);
	console.log(req.body.currentPassword);				
					
	if(!(await user.validatePassword(req.body.currentPassword, user.password))) {
		return res.status(401).json({ success: false, message: 'Failed password reset.' });	
	}
	
	user.password = req.body.newPassword;
	await user.save();
		
	res.status(200).json({ success: true, message: "User password updated successfully." });
});


