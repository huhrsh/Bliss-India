const express=require('express');
const router=express.Router();
const passport = require('passport');

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
    
    router.post('/update-user', usersController.updateUser)


module.exports=router;