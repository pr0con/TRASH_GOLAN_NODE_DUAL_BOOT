const utils = require('../utilz.js');
const asyncHandler = require('../Middleware/asyncHandler.js');
const Servers = require('../Models/ServersModel.js');
const Projects = require('../Models/ProjectsModel.js');

exports.getProjects = asyncHandler(async(req, res, next) => {
	if(req.params.serverId) {
		let projects =  await Projects.find({ server: req.params.serverId })
		res.status(200).json({
			success: true,
			count: projects.length,
			data: projects
		});		
	} else {
		res.status(200).json(res.mongoResult);
	}	
});

exports.getProject = asyncHandler(async (req, res, next) => {
	const project = await Projects.findById(req.params.id);
	
	/*
		const project = await Projects.findById(req.params.id).populate({
			path: 'server',
			select: 'name description'
		});
	*/
	
	
	if(!project) {
		return next();
	} 
	
	res.status(200).json({  success: true, data: project });
});


exports.createProject = asyncHandler(async (req, res, next) => {	
	let server = await Servers.findById(req.body.server);
	
	if(!server) {
		return next();
	}
	
	/* We should have a logged in user for this route lets add there id as creator */
	req.body.user = req.user._id;
	
	const project = await Projects.create(req.body);
	if(!project) {
		return next();
	}	
	
	res.status(200).json({ success: true, data: project });	
});

exports.updateProject = asyncHandler(async (req, res, next) => {
	//dont update quite yet need to check useer
	let project = await Projects.findById(req.params.id);	
	if(!project) {
		return next();
	}
	
	
	/* Check user owns project */
	if(project.user === req.user._id || req.user.role === "admin") {
		const project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		
		res.status(200).json({ success: true, data: project})
	}else {
		return res.status(400).json({ success: false, message: 'Not an Admin Or User does not own this project.' });	
	}
});



exports.deleteProject = asyncHandler(async (req, res, next) => {
	let project = await Projects.findById(req.params.id);
	
	if(!project) {
		return res.status(400).json({ success: false, message: 'Project not found?'})
	}
	
	/* Check user owns project */
	if(project.user === req.user._id || req.user.role === "admin") {	
		project = await Projects.findByIdAndDelete(req.params.id);
		res.status(200).json({  success: true, data: {} });
	}else {
		return res.status(400).json({ success: false, message: 'Not an Admin Or User does not own this project.' });
	}
});

