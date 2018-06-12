'use strict'

const panzoom = require('./')
const regl = require('regl')({ extensions: ['OES_element_index_uint'] })
const scatter = require('regl-scatter2d')(regl)


let range = [-10, -10, 10, 10]
let canvas = scatter.canvas

scatter({ points: [0,0, 1,1, 2,2], colors: ['red', 'green', 'blue'], range })

panzoom('canvas', e => {
  console.log(e)

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
