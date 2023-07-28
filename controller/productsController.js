const Product=require('../models/product')

module.exports.mainProduct=function(req,res){
    Product.find()
}

module.exports.singleProduct=function(req,res){
    Product.findOne({_id:req.query.id})
    .then((productFound)=>{
        if(productFound){
            res.render("singleProduct", {
                title: `Bliss India | ${productFound.name}`,
                product: productFound
            });
        }
        else{
            console.log("No product of the id found to be displayed");
            return res.redirect('back');
        }
    })
    .catch((err) => {
        console.log("Error in finding the product to be displayed");
        return res.redirect('back');
    })
}

module.exports.crystalCollection = function (req, res) {
    Product.find({ category: 'crystal' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Pendants Collection',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding crystal collection");
            return res.redirect('back');
        })
}

module.exports.pendants = function (req, res) {
    Product.find({ category: 'pendant' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Pendants',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding pendant collection");
            return res.redirect('back');
        })
}

module.exports.lockets = function (req, res) {
    Product.find({ category: 'locket' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Lockets',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding lockets collection");
            return res.redirect('back');
        })
}

module.exports.earrings = function (req, res) {
    Product.find({ category: 'earring' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Earrings',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding earrings collection");
            return res.redirect('back');
        })
}

module.exports.bracelets = function (req, res) {
    Product.find({ category: 'bracelet' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Bracelets',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding bracelets collection");
            return res.redirect('back');
        })
}

module.exports.rings = function (req, res) {
    Product.find({ category: 'ring' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Rings',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding rings collection");
            return res.redirect('back');
        })
}

module.exports.completeSets = function (req, res) {
    Product.find({ category: 'complete' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Complete Sets',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding complete sets collection");
            return res.redirect('back');
        })
}

module.exports.evilEyeCollection = function (req, res) {
    Product.find({ category: 'evil_eye' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Evil Eye Collection',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding evil eye collection");
            return res.redirect('back');
        })
}

module.exports.offers = function (req, res) {
    Product.find({ category: 'offer' })
        .then((collection) => {
            res.render("productsCollection", {
                title: 'Bliss India | Offers',
                collection: collection
            });
        })
        .catch((err) => {
            console.log("Error in finding offer collection");
            return res.redirect('back');
        })
}

