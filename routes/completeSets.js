const express=require('express');
const router= express.Router();
const completeSetsController=require('../controller/completeSetsController')

router.get('/',completeSetsController.home)

module.exports=router;