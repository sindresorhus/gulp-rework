'use strict';
/* eslint-env mocha */
const assert = require('assert');
const at2x = require('rework-plugin-at2x');
const Vinyl = require('vinyl');
const sourcemap = require('source-map');
const rework = require('.');

it('should preprocess CSS using Rework', cb => {
	const stream = rework(at2x());

	stream.on('data', data => {
		assert.equal(
			data.contents.toString(),
			'.logo {\n  background-image: url(\'component.png\');\n  width: 289px;\n  height: 113px;\n}\n\n@media (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {\n  .logo {\n    background-image: url("component@2x.png");\n    background-size: contain;\n  }\n}'
		);
		cb();
	});

	stream.end(new Vinyl({
		contents: Buffer.from('.logo{background-image:url(\'component.png\') at-2x;width:289px;height:113px;}')
	}));
});

it('should support Source Map', cb => {
	const stream = rework(at2x(), {sourcemap: true});

	stream.on('data', data => {
		assert.equal(
			data.contents.toString(),
			'.logo {\n  background-image: url(\'component.png\');\n  width: 289px;\n  height: 113px;\n}\n\n@media (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {\n  .logo {\n    background-image: url("component@2x.png");\n    background-size: contain;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdXJjZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBTTtFQUE0QztFQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ297YmFja2dyb3VuZC1pbWFnZTp1cmwoJ2NvbXBvbmVudC5wbmcnKSBhdC0yeDt3aWR0aDoyODlweDtoZWlnaHQ6MTEzcHg7fSJdfQ== */'
		);
		cb();
	});

	stream.end(new Vinyl({
		contents: Buffer.from('.logo{background-image:url(\'component.png\') at-2x;width:289px;height:113px;}')
	}));
});

function identityPlugin() {
	return () => {};
}

it('should support gulp-sourcemap', cb => {
	const map = new sourcemap.SourceMapGenerator({file: 'src/styles/logo.css'});
	map.addMapping({
		generated: {line: 1, column: 0},
		source: 'src/styles/mixin.scss',
		original: {line: 33, column: 2},
		name: 'abc'
	});

	const file = new Vinyl({
		path: '/Users/me/code/src/styles/logo.css',
		base: '/Users/me/code',
		contents: Buffer.from('.logo{width:289px;}')
	});
	file.sourceMap = map.toJSON();

	const stream = rework(identityPlugin());

	stream.on('data', data => {
		try {
			assert.equal(
				data.contents.toString(),
				'.logo {\n  width: 289px;\n}'
			);

			const map = new sourcemap.SourceMapConsumer(data.sourceMap);
			assert.deepEqual(
				map.originalPositionFor({line: 2, column: 2}),
				{line: 33, column: 2, source: 'src/styles/mixin.scss', name: 'abc'});

			cb();
		} catch (err) {
			cb(err);
		}
	});

	stream.write(file);
});

it('should not override given options', cb => {
	const map = new sourcemap.SourceMapGenerator({file: 'src/styles/logo.css'});
	const file = new Vinyl({
		path: 'src/styles/logo.css',
		contents: Buffer.from('.logo{width:289px;}')
	});
	file.sourceMap = map.toJSON();
	const options = {};

	const stream = rework(identityPlugin(), options);

	stream.on('data', () => {
		try {
			assert.deepEqual(
				options, {}
			);

			cb();
		} catch (err) {
			cb(err);
		}
	});

	stream.write(file);
});
