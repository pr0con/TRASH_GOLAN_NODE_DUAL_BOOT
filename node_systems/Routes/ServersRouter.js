const utils = require('../utilz.js');
const router = require('express').Router();

const {
	getServers,
	getServer,
	createServer,
	updateServer,
	deleteServer,
	getServersWithinRadius,
	uploadServerImage,
} = require('../Controllers/ServersController.js');

const Servers = require('../Models/ServersModel.js');
const mongoResults = require('../Middleware/mongoResults.js');
const { Protected, Role } = require('../Middleware/Protected.js');

/* Other Resources Rotues */
const projectsRouter = require('./ProjectsRouter.js');
router.use('/:serverId/projects/', projectsRouter);

router.route('/').get(mongoResults(Servers,'projects'), getServers).post(Protected, Role(['admin']), createServer);
router.route('/:id/photo').post(uploadServerImage);
router.route('/:id').get(getServer).put(Protected, Role(['admin']),updateServer).delete(Protected, Role(['admin']), deleteServer);
router.route('/radius/:zipcode/:distance').get(getServersWithinRadius);

module.exports = router;