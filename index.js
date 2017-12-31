'use strict';
const through = require('through2');
const _ = require('lodash');
const rework = require('rework');
const PluginError = require('plugin-error');
const Buffer = require('safe-buffer').Buffer;

const lastIsObject = _.flowRight(_.isPlainObject, _.last);

module.exports = function () {
	const args = [].slice.call(arguments);
	const options = lastIsObject(args) ? args.pop() : {};
	const plugins = args;

	return through.obj((file, enc, cb) => {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError('gulp-rework', 'Streaming not supported'));
			return;
		}

		try {
			const ret = rework(file.contents.toString(), {source: file.path});
			plugins.forEach(ret.use.bind(ret));
			file.contents = Buffer.from(ret.toString(options));
			cb(null, file);
		} catch (err) {
			cb(new PluginError('gulp-rework', err, {fileName: err.filename || file.path}));
		}
	});
};
