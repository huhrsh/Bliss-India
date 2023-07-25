const express=require('express');
const router= express.Router();
const crystalCollectionController=require('../controller/crystalCollectionController')

router.get('/',crystalCollectionController.home)

module.exports=router;