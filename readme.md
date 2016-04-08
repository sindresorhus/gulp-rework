# gulp-rework [![Build Status](https://travis-ci.org/sindresorhus/gulp-rework.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-rework)

> Preprocess CSS with [Rework](https://github.com/reworkcss/rework)

*Issues with the output should be reported on the Rework [issue tracker](https://github.com/reworkcss/rework/issues).*


## Install

```
$ npm install --save-dev gulp-rework
```


## Usage

```js
const gulp = require('gulp');
const rework = require('gulp-rework');
const at2x = require('rework-plugin-at2x');

gulp.task('default', () =>
	gulp.src('src/app.css')
		.pipe(rework(at2x(), {sourcemap: true}))
		.pipe(gulp.dest('dist'))
);
```


## API

The `compress` option from Rework is intentionally missing. A separate task like [gulp-csso](https://github.com/ben-eb/gulp-csso) will do a better job.

### rework(plugin, plugin, ..., [options])

Plugins are supplied as arguments.<br>
Optionally supply an object with options as the last argument.

### options

#### sourcemap

Type: `boolean`<br>
Default: `false`


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
