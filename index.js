/**
 * @module  pan-zoom
 *
 * Events for pan and zoom
 */
'use strict'


const Impetus = require('impetus')
const wheel = require('mouse-wheel')
const touchPinch = require('touch-pinch')
const position = require('touch-position')


module.exports = panzoom


function panzoom (target, cb) {
	if (target instanceof Function) {
		cb = target
		target = document.documentElement || document.body
	}

	//enable panning
	let pos = position({
		element: target
	})

	let impetus

	let initX = 0, initY = 0, init = true
	target.addEventListener('mousedown', e => init = true)
	target.addEventListener('touchstart', e => init = true)

	let lastY = 0, lastX = 0
	impetus = new Impetus({
		source: target,
		update: (x, y) => {
			if (init) {
				init = false
				initX = pos[0]
				initY = pos[1]
			}

			let e = {
				target,
				type: 'mouse',
				dx: x-lastX, dy: y-lastY, dz: 0,
				x: pos[0], y: pos[1],
				x0: initX, y0: initY
			}

			lastX = x
			lastY = y
			cb(e)
		},
		multiplier: 1,
		friction: .75
	})


	//enable zooming
	wheel(target, (dx, dy, dz, e) => {
		e.preventDefault()
		cb({
			target,
			type: 'mouse',
			dx: 0, dy: 0, dz: dy,
			x: pos[0], y: pos[1],
			x0: pos[0], y0: pos[1]
		})
	})

	//mobile pinch zoom
	let pinch = touchPinch(target)
	let mult = 2
	let initialCoords

	pinch.on('start', (curr) => {
		let [f1, f2] = pinch.fingers

		initialCoords = [f2.position[0]*.5 + f1.position[0]*.5, f2.position[1]*.5 + f1.position[1]*.5]

		impetus && impetus.pause()
	})
	pinch.on('end', () => {
		if (!initialCoords) return

		initialCoords = null

		impetus && impetus.resume()
	})
	pinch.on('change', (curr, prev) => {
		if (!pinch.pinching || !initialCoords) return

		cb({
			target,
			type: 'touch',
			dx: 0, dy: 0, dz: -(curr - prev)*mult,
			x: initialCoords[0], y: initialCoords[1],
			x0: initialCoords[0], y0: initialCoords[0]
		})
	})
}
