# pan-zoom ![tiny](https://img.shields.io/badge/gzipped-4.8kb-brightgreen.svg) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Panning and zooming events for any target. May come handy for webgl, canvas, svg, images or pure html manipulations. Handles mobile pinch-zoom, drag and scroll interactions, provides inertial movement.

See [demo](https://dy.github.io/plot-grid).

[![npm install pan-zoom](https://nodei.co/npm/pan-zoom.png?mini=true)](https://npmjs.org/package/pan-zoom/)

```js
const panzoom = require('pan-zoom');

// define interaction listener on a target
panzoom(document.body, e => {
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

  // target event is applied to
  e.target;

  // initial coordinates of interaction
  e.x0;
  e.y0;
});
```

## Example

```js
const panzoom = require('pan-zoom')
const regl = require('regl')({ extensions: ['OES_element_index_uint'] })
const scatter = require('regl-scatter2d')(regl)


let range = [-10, -10, 10, 10]
let canvas = scatter.canvas

scatter({ points: [0,0, 1,1, 2,2], range })

panzoom(canvas, e => {
  let w = canvas.offsetWidth
  let h = canvas.offsetHeight

  let rx = e.x / w
  let ry = e.y / h

  let xrange = range[2] - range[0],
      yrange = range[3] - range[1]

  if (e.dz) {
    let dz = e.dz / w
    range[0] -= rx * xrange * dz
    range[2] += (1 - rx) * xrange * dz

    range[1] -= (1 - ry) * yrange * dz
    range[3] += ry * yrange * dz
  }

  range[0] -= xrange * e.dx / w
  range[2] -= xrange * e.dx / w
  range[1] += yrange * e.dy / h
  range[3] += yrange * e.dy / h

  scatter({ range })
})
```

## Credits

This package puts together high-quality tiny components, so acknowledgment to their authors:

* [impetus](http://npmjs.org/package/impetus) by **[Chris Bateman @chrisbateman](https://github.com/chrisbateman)** handles inertial drag.
* [mouse-wheel](https://github.com/mikolalysenko/mouse-wheel) by **[Mikola Lysenko @mikolalysenko](https://github.com/mikolalysenko/mouse-wheel)** covers cross-browser wheel event.</del>
* [touch-pinch](https://www.npmjs.com/package/touch-pinch) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** handles mobile pinch gestures.
* [touch-position](https://www.npmjs.com/package/touch-position) by **[Matt DesLauriers @mattdesl](https://github.com/mattdesl)** tracks mouse and touch coordinates.

## License

© 2017 Dmitry Yv. MIT License
