const express=require('express');
const router= express.Router();
const productsController=require('../controller/productsController')
const passport=require('passport')


router.get('/',productsController.singleProduct);

router.post('/search-product',productsController.searchProduct);

router.get('/pendants',productsController.pendants);

router.get('/crystal-collection',productsController.crystalCollection);

router.get('/lockets',productsController.lockets);

router.get('/earrings',productsController.earrings);

router.get('/bracelets',productsController.bracelets);

router.get('/rings',productsController.rings);

router.get('/complete-sets',productsController.completeSets);

router.get('/evil-eye-collection',productsController.evilEyeCollection);

router.get('/offers',productsController.offers);

router.get('/edit-product-page' , passport.checkAuthentication,productsController.editProductPage);

router.post('/edit-product',passport.checkAuthentication,productsController.editProduct )

router.get('/delete-product',passport.checkAuthentication,productsController.deleteProduct )

router.get('/wishlist',productsController.wishlist);

router.get('/cart',productsController.cart);

router.get('/checkout',passport.checkAuthentication,productsController.checkout);

module.exports=router;