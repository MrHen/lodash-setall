var gulp = require('gulp');
var gulp_spawn_mocha = require('gulp-spawn-mocha');

var configs = {
    mocha: {}
};

var locations = {
    tests: "*.spec.js"
};

gulp.task('test', function() {
    return gulp.src([locations.tests])
        .pipe(gulp_spawn_mocha(configs.mocha));
});
