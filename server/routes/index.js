const Router = require('express')

const router = new Router();

const bookRouter = require('./bookRouter')
const clientRouter = require('./clientRouter')
const publishHouseRouter = require('./publishHouseRouter')
const warehouseRouter = require('./warehouseRouter')
const genreRouter = require('./genreRouter')

router.use('/book', bookRouter)
router.use('/client', clientRouter)
router.use('/publishHouse', publishHouseRouter)
router.use('/warehouse', warehouseRouter)
router.use('/genre', genreRouter)



module.exports = router;