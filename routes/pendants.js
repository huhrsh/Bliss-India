const express=require('express');
const router= express.Router();
const pendantsController=require('../controller/pendantsController')

router.get('/',pendantsController.home)

module.exports=router;