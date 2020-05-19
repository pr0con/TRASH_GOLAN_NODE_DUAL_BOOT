const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please provide a title.']
	},
	description: {
		type: String,
		required: [ true, 'Please give a description of the project' ]
	},
	resource_links: [String],
	createdAt: {
		type: Date,
		default: Date.now()
	},
	server: {
		type: mongoose.Schema.ObjectId,
		ref: 'Servers',
		required: true
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'Users',
		required: true
	}	
});

module.exports = mongoose.model('Projects', ProjectSchema);