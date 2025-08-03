const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

const {verifyToken,isAdmin} = require('../middleware/authMiddleware');

router.post('/add',supplierController.createSupplier);

router.get('/view',supplierController.getAllSupplier);

router.get('/:id',supplierController.getSupplierById);

router.put('/update/:id',supplierController.updateSupplier);

router.delete('/delete/:id',supplierController.deleteSupplier);

router.get('/searchSupplier/:name',supplierController.searchSupplierByName);

module.exports = router;
