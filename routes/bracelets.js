const express=require('express');
const router= express.Router();
const braceletsController=require('../controller/braceletsController')

router.get('/',braceletsController.home)

module.exports=router;