const express=require('express');
const router= express.Router();
const ringsController=require('../controller/ringsController')

router.get('/',ringsController.home)

module.exports=router;