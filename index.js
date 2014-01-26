'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var _ = require('lodash');
var rework = require('rework');
var lastIsObject = _.compose(_.isPlainObject, _.last);

module.exports = function () {
	var args = [].slice.call(arguments);
	var options = lastIsObject(args) ? args.pop() : {};
	var plugins = args;

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-rework', 'Streaming not supported'));
			return cb();
		}

		try {
			var ret = rework(file.contents.toString());
			plugins.forEach(ret.use.bind(ret));
			file.contents = new Buffer(ret.toString(options));
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-rework', err));
		}

		this.push(file);
		cb();
	});
};

// mixin the rework built-in plugins
delete rework.properties;
_.assign(module.exports, rework);
