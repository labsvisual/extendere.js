var gulp                  = require( 'gulp' ),
    concat                = require( 'gulp-concat' ),
    rename                = require( 'gulp-rename' ),
    uglify                = require( 'gulp-uglify' ),
    stripComment          = require( 'gulp-strip-comments' ),
    removeLines           = require( 'gulp-remove-empty-lines' );

gulp.task( 'compile', function() {

    gulp.src( "src/**/*.js" )
        .pipe( stripComment() )
        .pipe( removeLines() )
        .pipe( concat( "extendere.dev.js" ) )
        .pipe( gulp.dest( "dist/" ) );

});

gulp.task( 'minify', function() {

    gulp.src( "dist/extendere.dev.js" )
        .pipe( uglify() )
        .pipe( rename( "extendere.min.js" ) )
        .pipe( gulp.dest( "dist/" ) );

});

gulp.task( 'default', [ 'compile', 'minify' ] );
