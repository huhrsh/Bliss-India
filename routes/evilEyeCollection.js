const express=require('express');
const router= express.Router();
const evilEyeCollectionController=require('../controller/evilEyeCollectionController')

router.get('/',evilEyeCollectionController.home)

module.exports=router;