const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path')
const Product = require('../models/product');
const multer = require('multer')
const PRODUCT_PATH = path.join('/uploads/product');
const upload = multer({ dest: path.join(__dirname, '..', PRODUCT_PATH) })

const usersController = require('../controller/usersController')

router.get('/profile', passport.checkAuthentication, usersController.home);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create-user', usersController.createUser);

router.get('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

router.post('/update-user', passport.checkAuthentication, usersController.updateUser)

router.get('/change-password-page', usersController.changePasswordPage);

router.post('/change-password', usersController.changePassword);

router.get('/add-product-page', usersController.addProductPage)

router.post('/add-product', Product.uploadedAvatar.array('photos', 5), usersController.addProduct);

router.get('/forgot-password-page' , usersController.forgotPasswordPage);

router.post('/forgot-password' ,usersController.enterOTPPage )

router.post('/enter-OTP',usersController.checkOTP)

router.post('/create-new-password',usersController.createNewPassword);

router.get('/auth/google' , passport.authenticate('google' , {scope: ['profile' , 'email']}));

router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect: '/users/sign-in'}) , usersController.createSession);

router.post('/add-to-wishlist',usersController.addToWishlist);

router.get('/remove-from-wishlist' , usersController.removeFromWishlist);

router.get('/add-to-cart' , usersController.addToCart);

router.get('/remove-from-cart',usersController.removeFromCart);




module.exports = router;