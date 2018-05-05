'use strict';
const through = require('through2');
const _ = require('lodash');
const rework = require('rework');
const PluginError = require('plugin-error');
const applySourceMap = require('vinyl-sourcemaps-apply');

const lastIsObject = _.flowRight(_.isPlainObject, _.last);

module.exports = (...args) => {
	const options = Object.assign({}, lastIsObject(args) ? args.pop() : {});
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

			if (file.sourceMap) {
				options.sourcemap = true;
				options.inputSourcemap = false;
				options.sourcemapAsObject = true;
			}

			const result = ret.toString(options);
			if (file.sourceMap) {
				file.contents = Buffer.from(result.code);
				result.map.file = file.relative;
				result.map.sources = result.map.sources.map(() => file.relative);
				applySourceMap(file, result.map);
			} else {
				file.contents = Buffer.from(result);
			}

			cb(null, file);
		} catch (err) {
			cb(new PluginError('gulp-rework', err, {fileName: err.filename || file.path}));
		}
	});
};
