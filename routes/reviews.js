const express=require('express');
const router= express.Router();
const reviewsController=require('../controller/reviewsController')

router.post('/add-review',reviewsController.addReview);

module.exports=router;