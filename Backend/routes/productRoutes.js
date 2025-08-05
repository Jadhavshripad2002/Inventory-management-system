const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// const {verifyToken,isAdmin} = require('../middleware/authMiddleware');
router.post('/add',productController.addProduct);
router.get('/view',productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id',productController.deleteProduct);

router.get('/searchproduct/:name',productController.searchProductByName);
module.exports = router;