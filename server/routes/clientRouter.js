const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/registration',clientController.registration);
router.post('/login', clientController.login);
router.get('/auth', authMiddleware, clientController.check)
router.post('/cart/order', clientController.makeOrder);
router.get('/cart/:id', clientController.getCart)
router.get('/purchases/:id', clientController.getOrders)
router.put('/profile/', clientController.editProfileInfo)
router.get('/:id', clientController.getOne)
router.get('/', clientController.getAll)

module.exports = router;