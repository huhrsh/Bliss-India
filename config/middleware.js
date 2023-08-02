module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success': req.flash('success'),
        'alert': req.flash('alert'),
        'information': req.flash('information'),
        'error': req.flash('error')
    }

    next();
}