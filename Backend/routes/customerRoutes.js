const express= require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


router.post('/add',customerController.createCustomer);

router.get('/view',customerController.getAllCustomer);

router.get('/:id',customerController.getAllCustomerById)

router.put('/update/:id',customerController.updateCustomer);

router.delete('/delete/:id',customerController.deleteCustomer);

router.get('/searchCustomer/:name',customerController.searchCustomerByName);

module.exports=router;