const Router = require('express')
const bookController = require('../controllers/bookController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('Админ'), bookController.create);
router.get('/', bookController.getAll);
router.get('/vacantIndex', bookController.getVacantIndex);
router.get('/reviews/:id', bookController.getReviews);
router.post('/cart/add', bookController.addToCart)
router.post('/feedback', bookController.sendFeedback)
router.delete('/cart/del', bookController.removeFromCart)
router.get('/:id', bookController.getOne)

module.exports = router;