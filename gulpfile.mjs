// import gulp from 'gulp';
// import cleanCSS from 'gulp-clean-css'
// import rev from 'gulp-rev'
// import uglify from 'gulp-uglify-es'
// import imagemin from 'gulp-imagemin';
// import {deleteAsync} from 'del';
// // import imagemin from 'imagemin';
// // import imageminPngquant from 'imagemin-pngquant';
// // import imageminMozjpeg from 'imagemin-mozjpeg';
// // import imageminSvgo from 'imagemin-svgo'; 
// // import imageminJpegtran from 'imagemin-jpegtran'; 


  
// gulp.task('minify-js', (done) => {
//     console.log("Compressing JS");
//     gulp.src('./assets/JS/**/*.js')
//     // .pipe(plumber())
//     .pipe(uglify.default())
//     .pipe(rev())
//     .pipe(gulp.dest('./assets/Bundled'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./assets/Bundled'))
//     done();
// });
  

// gulp.task('minify-css', (done) => {
//     console.log("Compressing CSS");
//     gulp.src('./assets/CSS/**/*.css')
//     .pipe(cleanCSS())
//     // .pipe(gulp.dest('./public/assets'))
//     .pipe(rev())
//     // gulp.src('./assets/CSS/**/*.css')
//     .pipe(gulp.dest('./assets/Bundled'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./assets/Bundled'))
//     done();
// });


// // gulp.task('minify-images', (done) => {
// //     console.log("Compressing Images");
// //     gulp.src('./assets/Images/**/*.css')
// //     .pipe(cleanCSS())
// //     .pipe(gulp.dest('./public/assets'))
    
// //     gulp.src('./assets/CSS/**/*.css')
// //     .pipe(rev())
// //     .pipe(gulp.dest('./public/assets'))
// //     .pipe(rev.manifest({
// //         cwd:'public',
// //         merge:true
// //     }))
// //     .pipe(gulp.dest('./public/assets'))
// //     done();
// // });


// // (async () => {
// //     const files = await imagemin(['./assets/Images/*.+(png|jpg|jpeg|svg)'], {
// //         destination: 'output',
// //         plugins: [
// //             imageminMozjpeg(),
// //             imageminPngquant({ quality: [0.65, 0.8] }),
// //             imageminSvgo(),
// //             imageminJpegtran()
// //         ],
// //     });

// //     console.log('Images optimized:', files);
// // })();


// gulp.task('clean:assets',(done)=>{
//     console.log("Clearing assets");
//     deleteAsync('./public/assets');
//     done();
// })

// // gulp.task('build',gulp.series('clean:assets','minify-css','minify-js'),(done)=>{
// gulp.task('build',gulp.series('minify-css','minify-js'),(done)=>{
//     console.log("building assets");
//     done();
// })



