const user = require('../models/user');
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');


module.exports.home = function (req, res) {
  user.findOne({ _id: req.query.id })
    .then((userFound) => {
      // console.log("User Found for profile",userFound);
      res.render('ProfilePage', {
        title: `Bliss India | ${userFound.name.split(' ')[0]}`, 
        user: userFound,
      })
    })
    .catch((err)=>{
    console.log("Error in finding a user for profile");
    return res.redirect('back');
  })
}


module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  res.render('SignUp', {
    title: 'Bliss India | Sign Up'
  })
}

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  res.render('SignIn', {
    title: 'Bliss India | Sign In'
  })
}

module.exports.createUser = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  user.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        return res.redirect('back');
      }
      user.create(req.body)
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

module.exports.updateUser=function(req,res){
  user.findByIdAndUpdate(req.query.id,{
    name:req.body.name,
    address: req.body.address1+'\n'+req.body.address2+'\n'+req.body.address3
  })
  .then(()=>{
    user.findOne({ _id: req.query.id })
      .then((userFound) => {
        res.render('ProfilePage', {
          title: `Bliss India | ${userFound.name.split(' ')[0]}`, 
          user: userFound,
        })
      })
      .catch((err)=>{
        console.log("Cannot find user after updating");
        return res.redirect('back');
      })
  })
  .catch((err)=>{
    console.log("Error in updating user ",err);
    return res.redirect('back');
  })
}

module.exports.addProductPage=function(req,res){
    res.render('addProductPage',{
      title:'Bliss India | Add Product'
    })
}

// module.exports.addProduct=function(req,res){
//   console.log("Req body obtained from function start",req.body);

//   Product.create(req.body)
//   .then((newProduct)=>{
//     console.log("New object that is created ",newProduct);
//     Product.uploadedAvatar.array('photos',5)(req,res,function(err){
//       if (err) {
//         console.log("****Multer error: ", err);
//         return;
//       }
//       console.log("The file that is obtained",req.files);
//         newProduct.photos = req.files.map((file) => Product.avatarPath + '/' + file.filename);
//         // newProduct.photos = Product.avatarPath + '/' + req.file.filename; 
//       newProduct.save();
//     })
//     return res.redirect('back');
//   })
//   .catch((err)=>{
//     console.log("Error in creating new product ",err);
//     return res.redirect('back');
//   })
// }


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



