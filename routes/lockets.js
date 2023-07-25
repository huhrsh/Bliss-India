const express=require('express');
const router= express.Router();
const locketsController=require('../controller/locketsController')

router.get('/',locketsController.home)

module.exports=router;