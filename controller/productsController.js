const Product=require('../models/product')
const Review=require('../models/review')
const User=require('../models/user')


module.exports.singleProduct=function(req,res){
    Product.findOne({_id:req.query.id})
    .then((productFound)=>{
        return Product.populate(productFound, { path: 'review' ,  options: { sort: { createdAt: -1 } }});
    })
    .then((productFound)=>{
        return Product.populate(productFound, { path: 'user' });
    })
    .then((productFound)=>{
        if(productFound){
            if(res.locals.user){
                const cartItem = res.locals.user.cart.find(item => item.product.toString() == productFound._id);
                if(res.locals.user.wishlist.includes(productFound._id) && (cartItem)){
                    res.render("singleProduct", {
                        title: `${productFound.name}`,
                        product: productFound,
                        toggledWish:true,
                        toggledCart:true,
                    });
                }
                else if(res.locals.user.wishlist.includes(productFound._id) &&!(cartItem)){
                    res.render("singleProduct", {
                        title: `${productFound.name}`,
                        product: productFound,
                        toggledWish:true,
                        toggledCart:false,
                    });
                }
                else if(!res.locals.user.wishlist.includes(productFound._id) &&(cartItem)){
                    res.render("singleProduct", {
                        title: `${productFound.name}`,
                        product: productFound,
                        toggledWish:false,
                        toggledCart:true,
                    });
                }
                else{
                    res.render("singleProduct", {
                        title: `${productFound.name}`,
                        product: productFound,
                        toggledWish:false,
                        toggledCart:false,
                    });
                }
            }
            else{
                res.render("singleProduct", {
                    title: `${productFound.name}`,
                    product: productFound,
                    toggledWish:false,
                    toggledCart:false,
                });
            }
        }
    })
    .catch((err) => {
        console.log("Error in finding the product to be displayed");
        return res.redirect('back');
    })
}

module.exports.searchProduct=function(req,res){
    Product.find({"name" : {$regex : `${req.body.name}`}})
        .then((products)=>{
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        products
                    },
                    message: "Search Complete"
                })
            }
            return res.redirect('back');
        })
        .catch((err)=>{
            console.log("Error in finding products",err);
            return res.redirect('back');
        })
}

module.exports.crystalCollection = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'crystal' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Crystal Collection',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0].replace(/-/g, ' '),
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding crystal collection");
            return res.redirect('back');
        })
}

module.exports.pendants = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'pendant' }).sort(sortObject)
    .populate('review')
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Pendants',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0],
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding pendant collection");
            return res.redirect('back');
        })
}

module.exports.lockets = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'locket' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Lockets',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0],
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding lockets collection");
            return res.redirect('back');
        })
}

module.exports.earrings = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'earring' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Earrings',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0],
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding earrings collection");
            return res.redirect('back');
        })
}

module.exports.bracelets = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'bracelet' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Bracelets',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0],
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding bracelets collection");
            return res.redirect('back');
        })
}

module.exports.rings = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'ring' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Rings',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0],
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding rings collection");
            return res.redirect('back');
        })
}

module.exports.completeSets = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'complete' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Complete Sets',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0].replace(/-/g, ' '),
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding complete sets collection");
            return res.redirect('back');
        })
}

module.exports.evilEyeCollection = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'evil_eye' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Evil Eye Collection',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0].replace(/-/g, ' '),
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding evil eye collection");
            return res.redirect('back');
        })
}

module.exports.offers = function (req, res) {
    let sortBy=req.query.sort_by;
    let order=req.query.order;
    let sortObject = {};
    sortObject[sortBy] = order;
    Product.find({ category: 'offer' })
    .sort(sortObject)
    .populate('review')   
    .then((collection) => {
            res.render("productsCollection", {
                title: 'Offers',
                collection: collection,
                category:(req.url.split('/')[1]).split('?')[0],
                sorted:sortBy,
                order:order
            });
        })
        .catch((err) => {
            console.log("Error in finding offer collection");
            return res.redirect('back');
        })
}

module.exports.wishlist = function (req, res) {
    if(!res.locals.user){
        req.flash('information',"Please sign in to proceed");
        return res.redirect('/users/sign-in')
    }

    User.findOne({_id:res.locals.user._id})
    .then((user)=>{
        let sortBy=req.query.sort_by;
        let order=req.query.order;
        let sortObject = {};
        sortObject[sortBy] = order;
        Product.find({ _id: { $in: user.wishlist }})
        .sort(sortObject)
        .populate('review')   
        .then((product)=>{
            res.render("productsCollection", {
                title: 'Wishlist',
                collection: product,
                category:(req.url.split('/')[1]).split('?')[0],
                sorted:sortBy,
                order:order
            });
        })
    })
    .catch((err)=>{
        console.log("Error in finding user for wishlist, ",err);
        return res.redirect('back');
    })
}



module.exports.editProductPage = function(req,res){
    Product.findOne({_id:req.query.id})
    .then((product)=>{
        return  res.render('editProductPage',{
            title:'Edit Products',
            product:product,
        })
    })
    .catch((err)=>{
        return res.redirect("Error in opening edit product page");
    })
}


module.exports.cart=function(req,res){
    if(!res.locals.user){
        req.flash('information','Please sign in to proceed');
        return res.redirect('/users/sign-in')
    }
    User.findOne(res.locals.user._id)
    .populate('cart.product')
    .then((user)=>{
        for(let i of user.cart){
            // console.log(i.product.inventory)
            if(i.product.inventory==0){
                req.flash("information","Cart has been updated");
                User.findOneAndUpdate({_id:res.locals.user._id},{ $pull: { cart: { _id: i.id } }})
                .then((user)=>{
                })
                removedCart=true;
            }
            else if(i.product.inventory< i.quantity){
                console.log("Hi 2")
                req.flash("information","Cart has been updated");
                i.quantity=i.product.inventory;
                updatedCart=true;
            }
        }
        user.save()
        res.render('addToCart',{
            title:"Cart",
            collection:user.cart
        })
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('back')
    })
}

module.exports.checkout=function(req,res){
    if(!res.locals.user.address){
        req.flash('information','Please update profile to proceed');
        res.redirect(`/users/profile?id=${res.locals.user._id}`);
    }
    User.findOne({_id:res.locals.user._id}).populate('cart.product')
    .then((user)=>{
        res.render('checkout',{
            title:"checkout",
            collection:user.cart,
        })
    })
    .catch((err)=>{
        console.log("Error in finding user for checkout");
        res.redirect('back');
    })
}


// Product.updateMany({},{$set:{inventory:5}})
// .then(()=>{
//     console.log("Done updating inventory");
// })