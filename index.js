/**
 * @module  pan-zoom
 *
 * Events for pan and zoom
 */
'use strict'


var Impetus = require('impetus')
var wheel = require('mouse-wheel')
var touchPinch = require('touch-pinch')
var position = require('touch-position')
var raf = require('raf')


module.exports = panZoom


function panZoom (target, cb) {
	if (target instanceof Function) {
		cb = target
		target = document.documentElement || document.body
	}

	//enable panning
	var pos = position({
		element: target
	})

	var impetus

	var initX = 0, initY = 0, init = true
	target.addEventListener('mousedown', function (e) { init = true })
	target.addEventListener('touchstart', function (e) { init = true })

	var lastY = 0, lastX = 0
	impetus = new Impetus({
		source: target,
		update: function (x, y) {
			if (init) {
				init = false
				initX = pos[0]
				initY = pos[1]
			}

			var e = {
				target,
				type: 'mouse',
				dx: x - lastX, dy: y - lastY, dz: 0,
				x: pos[0], y: pos[1],
				x0: initX, y0: initY
			}

			lastX = x
			lastY = y

			schedule(e)
		},
		multiplier: 1,
		friction: .75
	})


	//enable zooming
	wheel(target, function (dx, dy, dz, e) {
		e.preventDefault()
		schedule({
			target,
			type: 'mouse',
			dx: 0, dy: 0, dz: dy,
			x: pos[0], y: pos[1],
			x0: pos[0], y0: pos[1]
		})
	})

	//mobile pinch zoom
	var pinch = touchPinch(target)
	var mult = 2
	var initialCoords

	pinch.on('start', function (curr) {
		var [f1, f2] = pinch.fingers

		initialCoords = [
			f2.position[0] * .5 + f1.position[0] * .5,
			f2.position[1] * .5 + f1.position[1] * .5
		]

		impetus && impetus.pause()
	})
	pinch.on('end', function () {
		if (!initialCoords) return

		initialCoords = null

		impetus && impetus.resume()
	})
	pinch.on('change', function (curr, prev) {
		if (!pinch.pinching || !initialCoords) return

		schedule({
			target,
			type: 'touch',
			dx: 0, dy: 0, dz: - (curr - prev) * mult,
			x: initialCoords[0], y: initialCoords[1],
			x0: initialCoords[0], y0: initialCoords[0]
		})
	})


	// schedule function to current or next frame
	var planned, frameId
	function schedule (ev) {
		if (frameId) {
			if (!planned) planned = ev
			else {
				planned.dx += ev.dx
				planned.dy += ev.dy
				planned.dz += ev.dz

				planned.x = ev.x
				planned.y = ev.y
			}

			return
		}

		cb(ev)

		frameId = raf(function () {
			frameId = null
			if (planned) {
				var arg = planned
				planned = null
				schedule(arg)
			}
		})
	}
}


