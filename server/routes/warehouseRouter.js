const Router = require('express');
const warehouseController = require('../controllers/warehouseController');
const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/',checkRole('Админ'), warehouseController.create);
router.get('/:id', warehouseController.getOne);
router.get('/', warehouseController.getAll);

module.exports = router;

