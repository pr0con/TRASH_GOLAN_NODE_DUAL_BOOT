const utils = require('../utilz.js'); 

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');

const UsersSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [ true, 'Username Required']
	},
    email: {
    	type: String,
		unique: true,
		required: [true, 'Email Required'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please add a valid email']
    },
   	role: {
		type: String,
		enum: ['user','admin'],
		default: 'user'
	},
	password: {
		type: String,
		required: [ true, 'Password Required'],
		minlength: 8,
		select: false //wont return when getting user from api
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,	
	createdAt: {
		type: Date,
		default: Date.now()
	},		 			
});

/* Encrypt Password */
UsersSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}	
	this.password = await bcrypt.hash(this.password, 10);
});


UsersSchema.methods.getSignedJwtToken = function(user) {
	let claims = utils.system_configuration['system']['oauth']['jwt_claims'];
	claims['jwtid'] = uuidv1();
	
	let scopes = {
		api: 'restricted_access'
	}
	switch(user['role']) {
		case "admin":
			scopes['api'] = 'god_access';
			break;
		default:
			break;	
	}
	return jwt.sign({user,scopes}, { key: utils.jwtPrivateKey, passphrase: 'SOMEHARDPASSWORD' }, claims)
}

UsersSchema.methods.validatePassword = async function(pwd, hash) {
	let result = await bcrypt.compare(pwd,hash);	
	
	return result;
}

UsersSchema.methods.generatePWDResetToken = function() {
	let rt = crypto.randomBytes(32).toString('hex');
	this.resetPasswordToken = crypto.createHash('sha256').update(rt).digest('hex');
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //10 minutes
	
	return rt;	
}



module.exports = mongoose.model('Users', UsersSchema);










