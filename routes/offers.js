const express=require('express');
const router= express.Router();
const offersController=require('../controller/offersController')

router.get('/',offersController.home)

module.exports=router;