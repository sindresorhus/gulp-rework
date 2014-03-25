# [gulp](https://github.com/wearefractal/gulp)-rework [![Build Status](https://travis-ci.org/sindresorhus/gulp-rework.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-rework)

> Preprocess CSS with [Rework](https://github.com/visionmedia/rework)

*Issues with the output should be reported on the Rework [issue tracker](https://github.com/visionmedia/rework/issues).*


## Install

```bash
$ npm install --save-dev gulp-rework
```


## Usage

```js
var gulp = require('gulp');
var rework = require('gulp-rework');

gulp.task('default', function () {
	gulp.src('src/app.css')
		.pipe(rework(rework.at2x(), {sourcemap: true}))
		.pipe(gulp.dest('dist'));
});
```

## API

The `compress` option from Rework is intentionally missing. A separate task like [gulp-csso](https://github.com/ben-eb/gulp-csso) will do a better job.

The [built-in plugins](https://github.com/visionmedia/rework#plugins) are available on the `rework` instance. Eg. `rework.at2x()`.

### rework(plugin, plugin, ..., [options])

Plugins are supplied as arguments.  
Optionally supply an object with options as the last argument.

### options.sourcemap

Type: `boolean`  
Default: `false`


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
