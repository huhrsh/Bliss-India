const Review=require('../models/review');
const Product=require('../models/product');
const User = require('../models/user');

module.exports.addReview=function(req,res){
    Review.create(req.body)
    .then((review)=>{
        console.log("The review was created successfully");
        Product.updateOne({_id:req.body.product},{
            $push:{review : review._id}
        })
        .then((newReview)=>{
            console.log("Review linked to product successfully");
        })
        .catch((err)=>{
            console.log("There was an error in linking review: ",err);
            // return res.redirect('back');
        })
        return res.redirect('back');
    })
    .catch((err)=>{
        console.log("There was an error in creating review: ",err);
        return res.redirect('back');
    })
}