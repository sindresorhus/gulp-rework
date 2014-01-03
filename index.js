'use strict';
var es = require('event-stream');
var rework = require('rework');
var _ = require('lodash');
var lastIsBoolen = _.compose(_.isBoolean, _.last);

module.exports = function () {
	var args = [].slice.call(arguments);
    var sourcemap = (lastIsBoolen(args)) ? args.pop() : false;
    var plugins = args;
  
	return es.map(function (file, cb) {
		var ret = rework(file.contents.toString());

		plugins.forEach(function (el) {
			ret.use(el);
		});
        
		file.contents = new Buffer(ret.toString({sourcemap: sourcemap}));
		cb(null, file);
	});
};

_.assign(module.exports, rework);
