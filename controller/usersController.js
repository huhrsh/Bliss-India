const user = require('../models/user');

module.exports.home=function(req,res){
    res.render('ProfilePage',{
        title:'profile page'
    })
}


module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
      }
    res.render('SignUp',{
        title:'Bliss India | Sign Up'
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
      }
    res.render('SignIn',{
        title:'Bliss India | Sign In'
    })
}

module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
    }

    user.findOne({ email: req.body.email })
      .then(existingUser => {
        if (existingUser) {
          return res.redirect('back');
        }
        return user.create(req.body)
          .then(newUser => {
            return res.redirect('/users/sign-in');
          });
      })
      .catch(err => {
        console.log('Error in finding or creating user: ', err);
        return res.redirect('back');
      });
  }

  module.exports.createSession = function(req,res){
    return res.redirect('/');
}