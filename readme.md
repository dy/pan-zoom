# pan-zoom ![tiny](https://img.shields.io/badge/gzipped-4.8kb-brightgreen.svg)[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Panning and zooming events for any target. May come handy for webgl, canvas, svg, images or pure html manipulations. Handles mobile pinch-zoom, drag and scroll interactions, provides inertial movement.

See [demo](https://dfcreative.github.io/plot-grid).

[![npm install pan-zoom](https://nodei.co/npm/pan-zoom.png?mini=true)](https://npmjs.org/package/pan-zoom/)

```js
const panzoom = require('pan-zoom');

panzoom(target,
	function onPan (dx, dy, cx, cy) => {
		//dx and dy are deltas from the last call
	},
	function onZoom (dx, dy, cx, cy) => {
		//cx and cy are current pointer coordinates relative to the target
	}
);
```

## Credits

This package puts together high-quality tiny components, so acknowledgment to their authors:

* [impetus](http://npmjs.org/package/impetus) by **[Chris Bateman @chrisbateman](https://github.com/chrisbateman)** handles inertial drag.
* [wheel](https://github.com/anvaka/wheel) by **[Andrei Kashcha @anvaka](https://github.com/anvaka)** covers cross-browser wheel event.
* [touch-pinch](https://www.npmjs.com/package/touch-pinch) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** handles mobile pinch gestures.
* [touch-position](https://www.npmjs.com/package/touch-position) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** tracks mouse and touch coordinates.
