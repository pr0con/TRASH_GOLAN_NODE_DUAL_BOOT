const os = require('os');
const fs = require('fs');

const NodeGeoCoder = require('node-geocoder');
const nodemailer = require("nodemailer");

const k3yc3r7 = {
	key: fs.readFileSync('/etc/letsencrypt/live/trash.pr0con.io/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/trash.pr0con.io/cert.pem'),
	key_path: '/etc/letsencrypt/live/trash.pr0con.io/privkey.pem',
	cert_path:	'/etc/letsencrypt/live/trash.pr0con.io/cert.pem',
};

var jwtPublicKey = fs.readFileSync('/var/www/keycertz/mykey.pub', 'utf8');
var jwtPrivateKey = fs.readFileSync('/var/www/keycertz/mykey.pem', 'utf8');

const system_configuration = {
	"system": {
		"databases": {
			"mongo": {
				"url": "mongodb://mongod:"+encodeURIComponent('SOMEHARDPASSWORD')+"@127.0.0.1:27017/api?authMechanism=SCRAM-SHA-1&authSource=admin"
			}
		},
		"oauth": {
			"jwt_secret": "SOMEHARDPASSWORD",
			"jwt_claims": {
		        issuer:    		"trash.pr0con.io",     	// who creates the token and signs it
		        audience:    	"trash.pr0con.io",  	// to whom the token is intended to be sent
		        expiresIn:   	"30m",             		// time when the token will expire (30 minutes from now)
		        jwtid:    		"",          			// a unique identifier for the token
		        //"iat":    	"", 					// when the token was issued/created (now) , USING DEFAULTS
		        notBefore:    	"0",                 	// time before which the token is not yet valid (0 milisecond agao, for emmediate validation)
		        subject:     	"Development Services", // the subject/principal is whom the token is about		       
				algorithm:  	"RS256"
		        //"user": null,							//filled in with custom
		        //"scopes": "api:full_access",			//example added later based on role...				
			},
			"verify_options": {
				issuer:  	"trash.pr0con.io",
				subject:  	"Development Services",
				audience:  	"trash.pr0con.io",
				expiresIn:  "30m",
				algorithm:  ["RS256"]					
			},
			"cookie_options": {
				expires: 1800000 //30 * 60 * 1000 = 30min
			}			
		},
		"map-quest": {
			"options": {
				provider: "mapquest",
				httpAdapter: "https",
				apiKey: "p1wmnj5rveAKu0NVgSjPzx3SG7yuuOl2",
				formatter: null,
			},
			"api-secret": "w2nq8jDs3xrHQuAa"
		}		
	},
}

function logData(message) {
	var d = new Date();
	var time = '[' + d.getHours() + ':' + d.getMinutes() + ':' +d.getSeconds() + '] ';
	
	console.log(time + message);
}

const sendResetPasswordEmail = async (options) => {
	let resetPasswordNotice = {
		from: 'noreply@pr0con.com',
		to: options['to'],
		subject: 'Reset Password Link',
		text: options['body'],
	}
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'someuse@gmail.com',
			pass: 'SOMEHARDPASSWORD',
		}
	});
	
	const send = transporter.sendMail(resetPasswordNotice);
}


module.exports = {
	k3yc3r7,
	//jwtPublicKey,
	system_configuration,	
		
	logData,
	geocode: (addr) => NodeGeoCoder(system_configuration['system']['map-quest']['options']).geocode(addr),
	
	jwtPublicKey,
	jwtPrivateKey,
	
	sendResetPasswordEmail
}

