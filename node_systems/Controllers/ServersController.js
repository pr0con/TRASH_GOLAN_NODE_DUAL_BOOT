const path = require('path');
const utils = require('../utilz.js');
const Servers = require('../Models/ServersModel.js');
const asyncHandler = require('../Middleware/asyncHandler.js');


exports.getServers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.mongoResult); //res.result is from mongoResults middleware...
});

exports.getServersWithinRadius = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params;
	
	let loc = await utils.geocode(zipcode);
	let lat = loc[0].latitude;
	let lon = loc[0].longitude;
	
	//distance (miles) / radius earth (miles)
	const radius = distance / 3963;
	const servers = await Servers.find({
		location: { $geoWithin: { $centerSphere: [[ lon ,lat], radius ] }}
	});
	
	res.status(200).json({
		code: 705,
		success: true,
		count: servers.length,
		data: servers
	});
});

exports.createServer = asyncHandler(async (req, res, next) => {	
	const server = await Servers.create(req.body);
	res.status(200).json({ success: true, data: server });		
});

exports.getServer = asyncHandler(async (req, res, next) => {
	const server = await Servers.findById(req.params.id);
	
	if(!server) {
		return next();
	} 
	
	res.status(200).json({ success: true, data: server });
});

exports.deleteServer = asyncHandler(async (req, res, next) => {
	//const server = await Servers.findByIdAndDelete(req.params.id);
	const server = await Servers.findById(req.params.id);
	
	if(!server) {
		return res.status(400).json({ success: false })
	}
	
	server.remove();
	
	res.status(200).json({ success: true, data: {} });
});

exports.updateServer = asyncHandler(async (req, res, next) => {
	const server = await Servers.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});
	
	if(!server) {
		return next();
	}
	
	res.status(200).json({ success: true, data: server });
});


exports.uploadServerImage = asyncHandler(async (req, res, next) => {
	const server = await Servers.findById(req.params.id);
	
	if(!server) {
		return next();
	} 
	
	console.log(req.files);
	
	if(!req.files) {
		return res.status(400).json({  success: false,  message: 'No file found in upload request.'});
	}
	
	if(!req.files.file.mimetype.startsWith('image')) {
		return res.status(400).json({  success: false,  message: 'Accepts an image only.'});
	}	
	
	req.files.file.name = `${server._id}${path.parse(req.files.file.name).ext}`;
	
	req.files.file.mv(`/var/www/parcel_blueprint/dist/uploads/server_photos/${req.files.file.name}`, async (err) => {
		console.log('GOT HERE...');
		if(err) {
			return res.status(500).json({  success: false,  message: 'Failed image upload.'});
		}
		await Servers.findByIdAndUpdate(server._id, {photo: `/uploads/server_photos/${req.files.file.name}`});
		
		res.status(200).json({
			success: true,
			img_path: `/uploads/server_photos/${req.files.file.name}`
		});
	});
});




