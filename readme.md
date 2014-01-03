# [gulp](https://github.com/wearefractal/gulp)-rework [![Build Status](https://secure.travis-ci.org/sindresorhus/gulp-rework.png?branch=master)](http://travis-ci.org/sindresorhus/gulp-rework)

> Preprocess CSS with [Rework](https://github.com/visionmedia/rework)

*Issues with the output should be reported on the Rework [issue tracker](https://github.com/visionmedia/rework/issues).*


## Install

Install with [npm](https://npmjs.org/package/gulp-rework)

```
npm install --save-dev gulp-rework
```


## Examples

```js
var gulp = require('gulp');
var rework = require('gulp-rework');
var autoprefixer = require('autoprefixer');

gulp.task('default', function () {
	gulp.src('src/app.css')
		.pipe(rework(rework.at2x(), autoprefixer().rework))
		.pipe(gulp.dest('dist'));
});
```

### With source Maps
```js
var gulp = require('gulp');
var rework = require('gulp-rework');
var autoprefixer = require('autoprefixer');

gulp.task('default', function () {
    gulp.src('src/app.css')
        // Add true after plugins to enable soursemaps
        .pipe(rework(rework.at2x(), autoprefixer().rework, true))
        .pipe(gulp.dest('dist'));
});
```
## API

The `compress` option from Rework is intentionally missing. A separate task like [gulp-csso](https://github.com/ben-eb/gulp-csso) will do a much better job.

The [built-in plugins](https://github.com/visionmedia/rework#plugins) are available on the `rework` instance. Eg. `rework.at2x()`.

### rework(plugin, plugin, ..., [souremaps:false])

Plugins are supplied as arguments. The last argument is for source maps support
this is optional, it is a boolean value which defaults to false.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
