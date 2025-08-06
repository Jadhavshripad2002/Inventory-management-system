
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { getProductById } = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


router.post('/add',purchaseController.createPurchase);

router.get('/view',purchaseController.getAllPurchase);

router.get('/:id', purchaseController.getPurchaseById);
module.exports = router;

router.put('/update/:id',purchaseController.updatePurchase);

router.delete('/delete/:id', purchaseController.deletePurchase);


router.get('/searchInvoice/:invoice',purchaseController.searchInvoice)



module.exports = router;