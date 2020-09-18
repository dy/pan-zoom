# pan-zoom ![tiny](https://img.shields.io/badge/gzipped-4.8kb-brightgreen.svg) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Panning and zooming events for any target. May come handy for webgl, canvas, svg, images or pure html manipulations. Handles mobile pinch-zoom, drag and scroll interactions, provides inertial movement.

See [demo](https://dy.github.io/plot-grid).

[![npm install pan-zoom](https://nodei.co/npm/pan-zoom.png?mini=true)](https://npmjs.org/package/pan-zoom/)

```js
const panzoom = require('pan-zoom');

let unpanzoom = panzoom(document.body, e => {
  // e contains all the params related to the interaction

  // pan deltas
  e.dx;
  e.dy;

  // zoom delta
  e.dz;

  // coordinates of the center
  e.x;
  e.y;

  // type of interaction: mouse, touch, keyboard
  e.type;

  // target element event is applied to
  e.target;

  // original element event started from
  e.srcElement;

  // initial coordinates of interaction
  e.x0;
  e.y0;
});

// call to remove panzoom handler from the target
unpanzoom()
```

See [`test.js`](https://github.com/dy/pan-zoom/blob/master/test.js) for basic use-case.

## Alternatives

* [@soulfresh/pan-zoom](https://github.com/soulfresh/pan-zoom#readme) − compatible fork with elaborate API and fixes.

## Credits

This package puts together high-quality tiny components, so acknowledgment to their authors:

* [impetus](http://npmjs.org/package/impetus) by **[Chris Bateman @chrisbateman](https://github.com/chrisbateman)** handles inertial drag.
* [mouse-wheel](https://github.com/mikolalysenko/mouse-wheel) by **[Mikola Lysenko @mikolalysenko](https://github.com/mikolalysenko/mouse-wheel)** covers cross-browser wheel event.</del>
* [touch-pinch](https://www.npmjs.com/package/touch-pinch) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** handles mobile pinch gestures.
* [touch-position](https://www.npmjs.com/package/touch-position) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** tracks mouse and touch coordinates.

## License

© 2017 Dmitry Yv. MIT License
