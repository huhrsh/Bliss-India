const Review=require('../models/review');
const Product=require('../models/product');
const User = require('../models/user');

// module.exports.addReview=async function(req,res){
//     try{
//         let reviewFound= await Review.create(req.body);
        
//         if(reviewFound){
//             // console.log("The review was created successfully",review);
//             let product=await Product.findOne({_id:req.body.product})

//             if(product){
//                 product.review.push(reviewFound._id);
//                 if (product.review && product.review.length > 0) {
//                     let totalRating = 0;
//                     product.review.forEach((review2) => {
//                         totalRating += review2.stars;
//                     });
//                     const averageRating = totalRating / product.review.length;
//                     product.review_rating = averageRating;
//                 }
//                 product.save()
//                 .then(() => {
//                 console.log(`Review rating updated for product with ID: ${product._id}`);
//                 req.flash('information' , 'Review added');
//                 if(req.xhr){
//                     return res.status(200).json({
//                         data:{
//                             review:reviewFound
//                         },
//                         message:'review Created'
//                     });
//                 }
//                 })
//                 .catch((err) => {
//                 console.error(`Error updating review rating for product with ID: ${product._id}`);
//                 });
//             }
//         }
//         return res.redirect('back');
//     }catch(err){
//         console.log("Error in creating review");
//         res.redirect('back');
//     }
// }


module.exports.addReview = async function (req, res) {
    try {
      let review = await Review.create(req.body);
  
      if (review) {
        let product = await Product.findOne({ _id: req.body.product }).populate('review');
  
        if (product) {
          product.review.push(review);
          if (product.review && product.review.length > 0) {
            let totalRating = 0;
            for (let i = 0; i < product.review.length; i++) {
              totalRating += parseInt(product.review[i].stars);
            }
            const averageRating = totalRating / product.review.length;
            product.review_rating = averageRating;
          }
  
          await product.save();
  
          req.flash('information', 'Review added');
  
          if (req.xhr) {
            return res.status(200).json({
              data: {
                review: review
              },
              message: 'Review Created'
            });
          }
        }
      }
  
      return res.redirect('back');
    } catch (err) {
      console.log("Error in creating review:");
      res.redirect('back');
    }
  };
  


// Product.find({})
//   .populate('review') 
//   .then((products) => {
//     products.forEach((product) => {
//       if (product.review && product.review.length > 0) {
//         let totalRating = 0;
//         product.review.forEach((review) => {
//             totalRating += review.stars;
//         });
//         const averageRating = totalRating / product.review.length;
//         product.review_rating = averageRating;
//         product.save()
//           .then(() => {
//             console.log(`Review rating updated for product with ID: ${product._id}`);
//           })
//           .catch((err) => {
//             console.error(`Error updating review rating for product with ID: ${product._id}`);
//           });
//       }
//     });
//   })
//   .catch((err) => {
//     console.error('Error fetching products:', err);
//   });
