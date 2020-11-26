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
var hasPassive = require('has-passive-events')


module.exports = panZoom


function panZoom (target, cb) {
	if (target instanceof Function) {
		cb = target
		target = document.documentElement || document.body
	}

	if (typeof target === 'string') target = document.querySelector(target)

	//enable panning
	var touch = position.emitter({
		element: target
	})

	var impetus

	var initX = 0, initY = 0, init = true, srcElement
	var initFn = function (e) { init = true, srcElement = e.srcElement }
	target.addEventListener('mousedown', initFn)
	target.addEventListener('touchstart', initFn, hasPassive ? { passive: true } : false)

	var lastY = 0, lastX = 0
	impetus = new Impetus({
		source: target,
		update: function (x, y, ...args) {
			if (init) {
				init = false
				initX = touch.position[0]
				initY = touch.position[1]
			}

			var e = {
				srcElement,
				target: target,
				type: 'mouse',
				dx: x - lastX, dy: y - lastY, dz: 0,
				x: touch.position[0], y: touch.position[1],
				x0: initX, y0: initY
			}

			lastX = x
			lastY = y

			schedule(e)
		},
		multiplier: 1,
		friction: .75
	})

	var isPassive = [window, document, document.documentElement, document.body].indexOf(target) >= 0

	//enable zooming
	var wheelListener = wheel(target, function (dx, dy, dz, e) {
		if (!isPassive) e.preventDefault()
		schedule({
			srcElement: e.srcElement,
			target: target,
			type: 'mouse',
			dx: 0, dy: 0, dz: dy,
			x: touch.position[0], y: touch.position[1],
			x0: touch.position[0], y0: touch.position[1]
		})
	})

	//mobile pinch zoom
	var pinch = touchPinch(target)
	var mult = 2
	var initialCoords

	pinch.on('start', function (curr) {
		var f1 = pinch.fingers[0];
		var f2 = pinch.fingers[1];

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
			srcElement: target,
			target: target,
			type: 'touch',
			dx: 0, dy: 0, dz: - (curr - prev) * mult,
			x: initialCoords[0], y: initialCoords[1],
			x0: initialCoords[0], y0: initialCoords[1]
		})
	})


	// schedule function to current or next frame
	var planned, frameId
	function schedule (ev) {
		if (frameId != null) {
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

		// Firefox sometimes does not clear webgl current drawing buffer
		// so we have to schedule callback to the next frame, not the current
		// cb(ev)

		frameId = window.requestAnimationFrame(function () {
			cb(ev)
			frameId = null
			if (planned) {
				var arg = planned
				planned = null
				schedule(arg)
			}
		})
	}

	return function unpanzoom () {
		touch.dispose()

		target.removeEventListener('mousedown', initFn)
		target.removeEventListener('touchstart', initFn)

		impetus.destroy()

		target.removeEventListener('wheel', wheelListener)

		pinch.disable()

		window.cancelAnimationFrame(frameId)
	}
}
