//Native
const https = require('https');

//3rd party 
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileupload = require("express-fileupload");

//our packages
const utils = require('./utilz.js');


//Define Routes
const auth = require('./Routes/AuthRouter.js');
const users = require('./Routes/UsersRouter.js');
const servers = require('./Routes/ServersRouter.js');
const projects = require('./Routes/ProjectsRouter.js');

//define custom middleware
const errorHandler = require('./Middleware/errorHandler.js');

//Define App
const app = express();

//apply middleware
app.use(cors({origin: true, credentials: true}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileupload());


//apply routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/servers', servers);
app.use('/api/v1/projects', projects);

//apply custom middleware...
app.use(errorHandler); 

//Init DB
const mongoose = require('./db.js');

(async function() {
	utils.logData('Attempting Mongoose connection...');
	mongoose.connectDB();
	
	https.createServer({
		key: utils.k3yc3r7.key,
		cert: utils.k3yc3r7.cert
	},
	app).listen(1200, () => {
		utils.logData('Express Server Listening...');
		app.use(function(err, req, res, next) {
			//console.log(req);
			console.log(req.headers.origin);
			
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Allow-Origin', 'https://junk.pr0con.io');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		    console.log(err);
		    
		    if(!err) {
			    next();
		    }			
		});
		
		app.use('/documentation', express.static('/var/www/node_systems/static'))	
	});
	
})();

process.on('unhandledRejection', (err, promise) => {
	console.log(`Caught Promise Rejection: ${err.message}`);
});









