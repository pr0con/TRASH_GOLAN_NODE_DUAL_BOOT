const express = require('express');
const router = express.Router();

const {
	getUsers,
	getUser,
	deleteUser,
	createUser,
	updateUser,
	updateProfile,
	updatePassword,
} = require('../Controllers/UsersController.js');

const Users = require('../Models/UsersModel.js');
const mongoResults = require('../Middleware/mongoResults.js');
const { Protected, Role } = require('../Middleware/Protected.js');

router.route('/').get(Protected, Role(['admin']), mongoResults(Users), getUsers).post(Protected, Role(['admin']), createUser);
router.route('/:id').get(Protected,Role(['admin']), getUser).put(Protected, Role(['admin']),updateUser).delete(Protected, Role(['admin']), deleteUser);

router.route('/profile/update').put(Protected, updateProfile);
router.route('/profile/update/password').put(Protected, updatePassword);


module.exports = router;