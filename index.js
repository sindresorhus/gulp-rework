'use strict';
var map = require('map-stream');
var rework = require('rework');
var _ = require('lodash');
var lastIsObject = _.compose(_.isPlainObject, _.last);

module.exports = function () {
	var args = [].slice.call(arguments);
	var options = lastIsObject(args) ? args.pop() : {};
	var plugins = args;

	return map(function (file, cb) {
		var ret = rework(file.contents.toString());
		plugins.forEach(ret.use.bind(ret));
		file.contents = new Buffer(ret.toString(options));
		cb(null, file);
	});
};

// mixin the rework built-in plugins
_.assign(module.exports, rework);
