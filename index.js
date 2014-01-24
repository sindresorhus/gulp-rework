'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var rework = require('rework');

function lastIsObject(args) {
    var last = args[args.length -1];
    if(typeof(last) !== 'object') { return false; }
    if(Array.isArray(last)) { return false; }
    if(last.prototype !== {}.prototype) { return false; }
    if(last.constructor !== {}.constructor) { return false; }
    return true;
}

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

var reworkIgnores = ['properties'];

for(var prop in rework) {
    if(!~reworkIgnores.indexOf(prop)) {
        if(rework.hasOwnProperty(prop) && typeof rework[prop] === 'function') {
            module.exports[prop] = rework[prop].bind(rework);
        }
    }
}
