const express=require('express');
const router= express.Router();
const productsController=require('../controller/productsController')

router.get('/',productsController.singleProduct);

router.get('/pendants',productsController.pendants);

router.get('/crystal-collection',productsController.crystalCollection);

router.get('/lockets',productsController.lockets);

router.get('/earrings',productsController.earrings);

router.get('/bracelets',productsController.bracelets);

router.get('/rings',productsController.rings);

router.get('/complete-sets',productsController.completeSets);

router.get('/evil-eye-collection',productsController.evilEyeCollection);

router.get('/offers',productsController.offers);


module.exports=router;