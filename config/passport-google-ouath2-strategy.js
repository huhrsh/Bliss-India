const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: "130798080418-dkn2v1qeb68euh24ng9tjqc6l0t4ma30.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken , refreshToken , profile , done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy passport' , err);
                return;
            }

            console.log(profile);

            if(user){
                return done(null,user)
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user' , err);
                        return;
                    }

                    return done(null,user);
                })
            }
        })
    }


));

module.exports = passport;