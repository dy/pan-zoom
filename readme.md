# pan-zoom ![tiny](https://img.shields.io/badge/gzipped-4.8kb-brightgreen.svg) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Panning and zooming events for any target. May come handy for webgl, canvas, svg, images or pure html manipulations. Handles mobile pinch-zoom, drag and scroll interactions, provides inertial movement.

See [demo](https://dfcreative.github.io/plot-grid).

[![npm install pan-zoom](https://nodei.co/npm/pan-zoom.png?mini=true)](https://npmjs.org/package/pan-zoom/)

```js
const panzoom = require('pan-zoom');

// define interaction listener on a target
panzoom(document.body, e => {
  //e contains all the params related to the interaction

  //pan deltas
  e.dx;
  e.dy;

  //zoom delta
  e.dz;

  //coordinates of the center
  e.x;
  e.y;

  //type of interaction: mouse, touch, keyboard
  e.type;
});
```

## Credits

This package puts together high-quality tiny components, so acknowledgment to their authors:

* [impetus](http://npmjs.org/package/impetus) by **[Chris Bateman @chrisbateman](https://github.com/chrisbateman)** handles inertial drag.
* [mouse-wheel](https://github.com/mikolalysenko/mouse-wheel) by **[Mikola Lysenko @mikolalysenko](https://github.com/mikolalysenko/mouse-wheel)** covers cross-browser wheel event.</del>
* [touch-pinch](https://www.npmjs.com/package/touch-pinch) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** handles mobile pinch gestures.
* [touch-position](https://www.npmjs.com/package/touch-position) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** tracks mouse and touch coordinates.
