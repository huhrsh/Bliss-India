const express=require('express');
const router= express.Router();
const homeController=require('../controller/homeController')

router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/products',require('./products'));


module.exports=router;