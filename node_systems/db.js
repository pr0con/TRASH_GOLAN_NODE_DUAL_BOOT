//Our Packages
const utils = require('./utilz.js');

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

mongoose.set('useFindAndModify', false);

const connectDB = async() => {
	let mconres = await mongoose.connect(utils.system_configuration['system']['databases']['mongo']['url'], { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
	utils.logData('Mongoose Connected Successfully');
}

module.exports = {
	connectDB
}

