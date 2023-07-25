const express=require('express');
const router= express.Router();
const homeController=require('../controller/homeController')

router.get('/',homeController.home);

router.use('/crystalCollection',require('./crystalCollection'));
router.use('/bracelets',require('./bracelets'));
router.use('/completeSets',require('./completeSets'));
router.use('/earrings',require('./earrings'));
router.use('/evilEyeCollection',require('./evilEyeCollection'));
router.use('/lockets',require('./lockets'));
router.use('/offers',require('./offers'));
router.use('/pendants',require('./pendants'));
router.use('/rings',require('./rings'));

module.exports=router;