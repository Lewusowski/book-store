const Router = require('express')
const genreController = require('../controllers/genreController')
const checkRole = require('../middleware/checkRoleMiddleware');

const router  = Router();

router.post('/', checkRole('Админ'), genreController.create);
router.get('/', genreController.getAll);
router.get('/:id', genreController.getOne);

module.exports = router;