const router = require('express').Router();
const userController = require('./../src/controllers/user');
const productController = require('./../src/controllers/product');


//router.use('/users', authMiddleware);

router.post('/user/login',  userController.login);
router.post('/user', userController.create);
router.put('/user/:id', userController.edit);
router.delete('/user/:id', userController.delete);

router.get('/product/:user',  productController.list);
router.get('/product/:id',  productController.view);
router.post('/product/', productController.create);
router.put('/product/:id', productController.edit);
router.delete('/product/:id', productController.delete);

module.exports = router;