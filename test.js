'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var rework = require('./index');

it('should preprocess CSS using Rework', function (cb) {
	var stream = rework(rework.at2x());
	stream.on('data', function (data) {
		assert.equal(
			data.contents.toString(),
			'.logo {\n  background-image: url(\'component.png\');\n  width: 289px;\n  height: 113px;\n}\n\n@media (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {\n  .logo {\n    background-image: url("component@2x.png");\n    background-size: contain;\n  }\n}'
		);
		cb();
	});

	stream.write(new gutil.File({
		contents: new Buffer('.logo{background-image:url(\'component.png\') at-2x;width:289px;height:113px;}')
	}));
});
