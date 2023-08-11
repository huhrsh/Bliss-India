const express=require('express');
const router= express.Router();
const ordersController=require('../controller/ordersController')

router.post('/create-order',ordersController.createOrder);

router.get('/receipt',ordersController.receipt)

module.exports=router;