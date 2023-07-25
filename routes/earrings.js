const express=require('express');
const router= express.Router();
const earringsController=require('../controller/earringsController')

router.get('/',earringsController.home)

module.exports=router;