const User = require('../models/user');
const Product = require('../models/product');
const forgotPasswordMailer=require('../mailers/password/forget_password_mailers');
const fs = require('fs');
const path = require('path');
const process = require('process');
const Order = require('../models/order');
const cloudinary=require('../config/cloudinary')

module.exports.home = function (req, res) {
  User.findOne({ _id: req.query.id })
    .then((userFound) => {
      // console.log("User Found for profile",userFound);
      res.render('profilePage', {
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
    if(user && !user.googleAuth){
      forgotPasswordMailer.forgotPassword(user,OTP);
      res.render('enterOTPPage',{
        title:'Enter OTP',
        OTP:OTP,
        userEmail:user.email
      })
    }

    else if(user && user.googleAuth){
      console.log("Can't change Google-authenticated users' passwords.");
      req.flash('information',"Can't change Google-authenticated users' passwords.")
      return res.redirect('back');
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
    req.flash('error' , 'OTP does not match');
    console.log("The otp does not match");
    return res.redirect('/users/forgot-password-page');
  }
}

module.exports.createNewPassword=function(req,res){
  if(req.body.password==req.body.confirm_password){
    User.findOneAndUpdate({email:req.query.email},{password:req.body.password})
    .then((user)=>{
      //req.flash('information' , 'Password changed.');
      return res.redirect('/users/sign-in');
    })
    .catch((err)=>{
      console.log("Error in finding user for updating password");
      return res.redirect('/users/forgot-password-page');
    })
  }
  else{
    req.flash('error' , 'Passwords do not match');
    // console.log("Passwords do not match");
    return res.redirect('/users/forgot-password-page');

  }
}

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  res.render('signUp', {
    title: 'Sign Up',
  })
}

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  res.render('signIn', {
    title: 'Sign In'
  })
}

module.exports.createUser = async function (req, res) {
  console.log(req.body);

  // Check if passwords match
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('back');
  }

  try {
    // Check if email is already in use
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash('error', 'Email already in use');
      return res.redirect('back');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the new user with hashed password
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      // Add other fields as necessary
    });

    req.flash('information', 'Account created.');
    return res.redirect('/users/sign-in');

  } catch (err) {
    console.log('Error in finding or creating user: ', err);
    req.flash('error', 'Something went wrong. Please try again.');
    return res.redirect('back');
  }
}


module.exports.createSession = function (req, res) {
  // console.log("When creating session: ",req.session);
  // req.flash('information' , 'Logged in.');
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log('Error in destroying the session', err);
      return;
    }
    // req.flash('information' , 'Logged out.');
    return res.redirect('/');
  });
}

module.exports.updateUser = function (req, res) {
  User.findByIdAndUpdate(req.query.id, {
    name: req.body.name,
    address: req.body.address1 + '\n' + req.body.address2 + '\n' + req.body.address3,
    phone:req.body.phone
  })
    .then(() => {
      User.findOne({ _id: req.query.id })
      .then((userFound) => {
         // req.flash('information' , 'Profile updated.');
          res.render('profilePage', {
            title: `${userFound.name.split(' ')[0]}`,
            user: userFound,
          })
        })
        .catch((err) => {
          req.flash('error' , 'Error in updating profile.');
          console.log("Cannot find user after updating");
          return res.redirect('back');
        })
      })
      .catch((err) => {
      req.flash('error' , 'Error in updating profile.');
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
        if (req.body.confirm_password != req.body.new_password) {
            console.log("Passwords do not match");
            req.flash('error' , 'Passwords do not match');
            return res.redirect('/users/change-password-page');
        }
        else{
          req.logout(function (err) {
            if (err) {
              console.log('Error in destroying the session', err);
              return;
            }
            newUser.password = req.body.new_password;
            newUser.save();
            req.flash('information' , 'Password changed.');
            return res.redirect('/users/sign-in');
          });
        }
      }
    })
    .catch((err) => {
      req.flash('error' , 'Error in changing password');
      console.log("Error in changing password", err);
      return res.redirect('back');
    })

}

module.exports.addProductPage = function (req, res) {
  res.render('addProductPage', {
    title: 'Add Product'
  })
}


// module.exports.uploadProductPhotos = Product.uploadedAvatar.array('photos', 2);

// module.exports.addProduct = function (req, res) {

//   Product.create(req.body)
//     .then((newProduct) => {
//       req.flash('information' , 'Product added.');

//       console.log("New object that is created ", newProduct);

//       if (req.files) {
//         newProduct.photos = req.files.map((file) => Product.avatarPath + '/' + file.filename);
//       }
//       newProduct.save();

//       return res.redirect('back');
//     })
//     .catch((err) => {
//       req.flash('error' , 'Error in adding products');
//       console.log("Error in creating new product ", err);
//       return res.redirect('back');
//     });
// }

module.exports.uploadProductPhotos = async (req, res, next) => {
  try {
      if (req.files && req.files.length > 0) {
          const uploadPromises = req.files.map(file => 
              cloudinary.uploader.upload(file.path, { folder: 'product' })
          );

          const uploadedPhotos = await Promise.all(uploadPromises);
          req.body.photos = uploadedPhotos.map(upload => upload.secure_url);
      }
      next();
  } catch (error) {
      req.flash('error', 'Error uploading photos');
      console.log("Error uploading photos to Cloudinary", error);
      return res.redirect('back');
  }
};

module.exports.addProduct = async (req, res) => {
  try {
      const newProduct = await Product.create(req.body);
      req.flash('information', 'Product added.');
      console.log("New object that is created", newProduct);

      return res.redirect('back');
  } catch (err) {
      req.flash('error', 'Error in adding products');
      console.log("Error in creating new product", err);
      return res.redirect('back');
  }
};

module.exports.addToWishlist = async function (req, res) {
  if (!req.body.user_id) {
    req.flash('information', 'Please sign in to proceed.');
    return res.redirect(`/users/sign-in?id=${req.body.product_id}`);
  }
  try {
    const userFound = await User.findOne({ _id: req.body.user_id });
    if (!userFound) {
      req.flash('error', 'User not found.');
      return res.redirect('back');
    }
    const productInWishlist = userFound.wishlist.includes(req.body.product_id);
    if (productInWishlist) {
      userFound.wishlist = userFound.wishlist.filter(
        (productId) => productId.toString() !== req.body.product_id.toString()
      );
      // req.flash('information', 'Removed from wishlist');
    } else {
      userFound.wishlist.push(req.body.product_id);
      // req.flash('information', 'Added to wishlist');
    }
    await userFound.save();
    res.redirect('back');
  } catch (err) {
    console.log(err);
    req.flash('error', 'Error in adding to wishlist.');
    res.redirect('back');
  }
};


module.exports.addToCart= async function(req,res){
  if (!req.body.user_id) {
    // req.session.productToAdd = req.body.product_id;
    // req.session.save();
    // console.log(req.session);
    req.flash('information', 'Please sign in to proceed.');
    return res.redirect(`/users/sign-in?id=${req.body.product_id}`);
  }
    try {
      const userFound = await User.findOne({ _id: req.body.user_id });
      if (!userFound) {
        req.flash('error', 'User not found.');
        return res.redirect('back');
      }
      const cartItem = userFound.cart.find(item => item.product.toString() == req.body.product_id);
      if(cartItem){
        return res.redirect('/products/cart')
      }
      else {
        userFound.cart.push({quantity : parseInt(req.body.product_quantity),product: req.body.product_id});
        // req.flash('information', 'Added to Cart');
        userFound.save();
        return res.redirect('back');
      }
    } catch (err) {
      console.log("Error in adding to cart",err);
      req.flash('error', 'Error in adding to Cart.');
      return res.redirect('back');
    } 
  }


module.exports.removeFromCart=function(req,res){
    User.findOneAndUpdate({_id:res.locals.user._id},{ $pull: { cart: { _id: req.query.id } }})
    .then((user)=>{
      res.redirect('back');
    })
    .catch((err)=>{
      console.log("Error in finding user");
      res.redirect('back');
    })
}

module.exports.myOrders=function(req,res){
  if(res.locals.user.adminAccess){
    Order.find({}).populate('user').populate('products.product').exec()
    .then((orders)=>{
      res.render('orders',{
        title:'Orders',
        collection:orders
      })
    })
    .catch((err)=>{
      console.log("Error in finding orders");
      res.redirect('back')
    })
  }
  else{
    Order.find({_id:{$in:res.locals.user.order}}).populate('products.product').exec()
    .then((orders)=>{
      res.render('orders',{
        title:'Orders',
        collection:orders
      })
    })
    .catch((err)=>{
      console.log("Error in finding orders");
      res.redirect('back')
    })
  }
}

