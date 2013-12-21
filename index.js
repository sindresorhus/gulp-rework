'use strict';
var es = require('event-stream');
var rework = require('rework');
var _ = require('lodash');

module.exports = function () {
	var plugins = [].slice.call(arguments);

	return es.map(function (file, cb) {
		var ret = rework(file.contents.toString());

		plugins.forEach(function (el) {
			ret.use(el);
		});

		file.contents = new Buffer(ret.toString());
		cb(null, file);
	});
};

_.assign(module.exports, rework);
