const Router = require('express')
const publishHouseController = require('../controllers/publishHouseController')
const {route} = require("express/lib/application");
const checkRole = require('../middleware/checkRoleMiddleware');

const router  = Router();

router.post('/', checkRole('Админ'), publishHouseController.create);
router.get('/', publishHouseController.getAll);
router.get('/:id', publishHouseController.getOne);

module.exports = router;