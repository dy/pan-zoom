/**
 * @module  pan-zoom
 *
 * Events for pan and zoom
 */
'use strict';


const Impetus = require('impetus');
const wheel = require('mouse-wheel');
const touchPinch = require('touch-pinch');
const position = require('touch-position');


module.exports = panzoom;


function panzoom (target, pan, zoom) {
	if (!target) return false;

	let pos = position({
		element: target
	});

	let impetus;

	//enable panning
	if (pan instanceof Function) {
		let lastY = 0, lastX = 0;
		impetus = new Impetus({
			source: target,
			update: (x, y) => {
				pan(x - lastX, y - lastY, pos[0], pos[1]);
				lastX = x;
				lastY = y;
			},
			multiplier: 1,
			friction: .75
		});
	}


	//enable zooming
	if (zoom instanceof Function) {
		wheel(target, (dx, dy, dz, e) => {
			e.preventDefault();
			zoom(dx, dy, pos[0], pos[1]);
		});

		//mobile pinch zoom
		let pinch = touchPinch(target);
		let mult = 2;
		let lastDist, initialCoords;

		pinch.on('start', (curr) => {
			impetus && impetus.pause();

			let [f1, f2] = pinch.fingers;

			lastDist = [Math.abs(f2.position[0] - f1.position[0]), Math.abs(f2.position[1] - f1.position[1])];

			initialCoords = [f2.position[0]*.5 + f1.position[0]*.5, f2.position[1]*.5 + f1.position[1]*.5];
		});
		pinch.on('end', () => {
			lastDist = null;
			initialCoords = null;

			impetus && impetus.resume();
		});
		pinch.on('change', (curr, prev) => {
			if (!pinch.pinching || !lastDist || !initialCoords) return;

			let [f1, f2] = pinch.fingers;

			let dist = [Math.abs(f2.position[0] - f1.position[0]), Math.abs(f2.position[1] - f1.position[1])];
			let delta = [dist[0] - lastDist[0], dist[1] - lastDist[1]];

			lastDist = dist;

			zoom(-delta[0]*mult, -delta[1]*mult, initialCoords[0], initialCoords[1]);
		});
	}
}
