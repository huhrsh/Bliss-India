const express=require('express');
const router= express.Router();
const homeController=require('../controller/homeController')

router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/products',require('./products'));
router.use('/reviews',require('./reviews'));
router.use('/orders',require('./orders'))

router.get('/motto',homeController.motto);
router.get('/return-policy',homeController.returnPolicy);
router.get('/terms-and-conditions',homeController.termsAndConditions);
router.get('/privacy-policy',homeController.privacyPolicy);
router.get('/career',homeController.career);

router.get('/error',homeController.error);

module.exports=router;