const User = require('../models/user');
const Product = require('../models/product');
const forgotPasswordMailer=require('../mailers/forget_password_mailers')
const fs = require('fs');
const path = require('path');
const { title } = require('process');


module.exports.home = function (req, res) {
  User.findOne({ _id: req.query.id })
    .then((userFound) => {
      // console.log("User Found for profile",userFound);
      res.render('ProfilePage', {
        title: `${userFound.name.split(' ')[0]}`,
        user: userFound,
      })
    })
    .catch((err) => {
      console.log("Error in finding a user for profile");
      return res.redirect('back');
    })
}

module.exports.forgotPasswordPage=function(req,res){
  res.render('forgotPasswordPage',{
    title:'Forgot Password'
  })
}

module.exports.enterOTPPage=function(req,res){
  console.log(req.body);
  let OTP=Math.floor(100000 + Math.random() * 900000);
  User.findOne({email:req.body.email})
  .then((user)=>{
    if(user){
      forgotPasswordMailer.forgotPassword(user,OTP);
      res.render('enterOTPPage',{
        title:'Enter OTP',
        OTP:OTP,
        userEmail:user.email
      })
    }
    else{
      // enter noty 
      console.log("No user found when forgot password");
      return res.redirect('back');
    }
  })
  .catch((err)=>{
    console.log("Error in finding user for forgot password: ",err);
    return res.redirect('back');
  })
}

module.exports.checkOTP=function(req,res){
  if(req.query.otp==req.body.otp){
    console.log("OTP matched");
    return res.render('createNewPassword',{
      title:'Create New Password',
      userEmail:req.query.email})
  }
  else{
    // enter noty 
    console.log("The otp does not match");
    return res.redirect('/users/forgot-password-page');
  }
}

module.exports.createNewPassword=function(req,res){
  if(req.body.password==req.body.confirm_password){
    User.findOneAndUpdate({email:req.query.email},{password:req.body.password})
    .then((user)=>{
      return res.redirect('/users/sign-in');
    })
    .catch((err)=>{
      console.log("Error in finding user for updating password");
      return res.redirect('/users/forgot-password-page');
    })
  }
  else{
    // Notification
    console.log("Passwords do not match");
    return res.redirect('/users/forgot-password-page');

  }
}


// module.exports.forgotPassword=function(req,res){
  
// }

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  res.render('SignUp', {
    title: 'Sign Up'
  })
}

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  res.render('SignIn', {
    title: 'Sign In'
  })
}

module.exports.createUser = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        return res.redirect('back');
      }
      User.create(req.body)
        .then((newUser) => {
          return res.redirect('/users/sign-in');
        });
    })
    .catch((err) => {
      console.log('Error in finding or creating user: ', err);
      return res.redirect('back');
    });
}

module.exports.createSession = function (req, res) {
  return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log('Error in destroying the session', err);
      return;
    }
    return res.redirect('/');
  });
}

module.exports.updateUser = function (req, res) {
  User.findByIdAndUpdate(req.query.id, {
    name: req.body.name,
    address: req.body.address1 + '\n' + req.body.address2 + '\n' + req.body.address3
  })
    .then(() => {
      User.findOne({ _id: req.query.id })
        .then((userFound) => {
          res.render('ProfilePage', {
            title: `${userFound.name.split(' ')[0]}`,
            user: userFound,
          })
        })
        .catch((err) => {
          console.log("Cannot find user after updating");
          return res.redirect('back');
        })
    })
    .catch((err) => {
      console.log("Error in updating user ", err);
      return res.redirect('back');
    })
}

module.exports.changePasswordPage = function (req, res) {
  res.render('changePasswordPage', {
    title: 'Change Password',
  })
}

module.exports.changePassword = function (req, res) {
  User.findOne({ _id: req.query.id, password: req.body.old_password })
    .then((newUser) => {
      if(newUser){
        newUser.password = req.body.new_password;
        newUser.save();
        console.log(newUser);
        return res.redirect('/users/sign-in');
      }
      else{
        console.log("Password does not match");
        return res.redirect('back');
      }
    })
    .catch((err) => {
      console.log("Error in changing password", err);
      return res.redirect('back');
    })

}

module.exports.addProductPage = function (req, res) {
  res.render('addProductPage', {
    title: 'Add Product'
  })
}


module.exports.uploadProductPhotos = Product.uploadedAvatar.array('photos', 2);

module.exports.addProduct = function (req, res) {
  console.log("Req body obtained from function start", req.body);
  console.log("The files that are obtained", req.files);

  Product.create(req.body)
    .then((newProduct) => {
      console.log("New object that is created ", newProduct);

      if (req.files) {
        newProduct.photos = req.files.map((file) => Product.avatarPath + '/' + file.filename);
      }
      newProduct.save();

      return res.redirect('back');
    })
    .catch((err) => {
      console.log("Error in creating new product ", err);
      return res.redirect('back');
    });
}



