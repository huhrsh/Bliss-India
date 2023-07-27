const express=require('express');
const router=express.Router();
const passport = require('passport');
const path=require('path')
const Product=require('../models/product');
const multer  = require('multer')
const PRODUCT_PATH = path.join('/uploads/product');
const upload = multer({ dest: path.join(__dirname , '..' , PRODUCT_PATH ) })

const usersController=require('../controller/usersController')

router.get('/profile' ,passport.checkAuthentication, usersController.home);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create-user' , usersController.createUser);

router.get('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
    ) , usersController.createSession);
    
    router.get('/sign-out' , usersController.destroySession);
    
    router.post('/update-user',passport.checkAuthentication, usersController.updateUser)

    router.get('/add-product-page',usersController.addProductPage)

    router.post('/add-product',Product.uploadedAvatar.array('photos',5),usersController.addProduct);

module.exports=router;