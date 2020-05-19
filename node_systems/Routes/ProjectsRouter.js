const utils = require('../utilz.js');
const router = require('express').Router({ mergeParams: true });

const {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,
} = require('../Controllers/ProjectsController.js');

const Projects = require('../Models/ProjectsModel.js');
const mongoResults = require('../Middleware/mongoResults.js');
const { Protected, Role } = require('../Middleware/Protected.js');

router.route('/').get(mongoResults(Projects,'server'), getProjects).post(Protected,Role(['admin']),createProject);
router.route('/:id').get(getProject).put(Protected, Role(['admin']),updateProject).delete(Protected,Role(['admin']),deleteProject);

module.exports = router;