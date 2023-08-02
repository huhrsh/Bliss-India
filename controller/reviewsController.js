const Review=require('../models/review');
const Product=require('../models/product');
const User = require('../models/user');

module.exports.addReview=async function(req,res){
    try{
        let review= await Review.create(req.body);
        
        if(review){
            console.log("The review was created successfully",review);
            let newProduct=await Product.updateOne({_id:req.body.product},{
                $push:{review : review._id}
            })
            if(newProduct){
                req.flash('information' , 'Review added');
                console.log("Updated Product successfully");
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            review:review
                        },
                        message:'review Created'
                    });
                }
            }
        }
        return res.redirect('back');
    }catch(err){
        console.log("Error in creating review");
        res.redirect('back');
    }
}