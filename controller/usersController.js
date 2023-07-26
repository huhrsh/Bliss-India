const user = require('../models/user');

module.exports.home = function (req, res) {
  user.findOne({ _id: req.query.id })
    .then((userFound) => {
      // console.log("User Found for profile",userFound);
      res.render('ProfilePage', {
        title: `Bliss India | ${userFound.name.split(' ')[0]}`, 
        profile_user: userFound,
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
  console.log(req.body);
  console.log(req.query);
  user.findByIdAndUpdate(req.query.id,{
    name:req.body.name,
    address: req.body.address1+'\n'+req.body.address2+'\n'+req.body.address3
  })
  .then(()=>{
    user.findOne({ _id: req.query.id })
      .then((userFound) => {
        res.render('ProfilePage', {
          title: `Bliss India | ${userFound.name.split(' ')[0]}`, 
          profile_user: userFound,
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
