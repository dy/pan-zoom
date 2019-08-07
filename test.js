'use strict'

const panzoom = require('./')
const regl = require('regl')({ extensions: ['OES_element_index_uint'] })
const scatter = require('regl-scatter2d')(regl)


let range = [-10, -10, 10, 10]
let canvas = scatter.canvas

let inner = document.createElement('div')
document.body.appendChild(inner)
inner.setAttribute('style', 'background: rgba(200,200,210,.2); width: 20px; height: 20px; top: 30%; left: 40%; position: absolute;')

scatter({ points: [0,0, 1,1, 2,2], colors: ['red', 'green', 'blue'], range })

let destroy = panzoom(document.body, e => {
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


// test double init

// dest disabling interactions

let off = document.body.appendChild(document.createElement('button'))
Object.assign(off.style, {
  position: 'absolute',
  left: '50%',
  width: '8rem',
  lineHeight: '1.6rem',
  marginLeft: '-4rem',
  bottom: '2rem'
})
off.innerHTML = 'remove panzoom'
off.addEventListener('click', () => {
  document.body.removeChild(off)
  destroy()
})
