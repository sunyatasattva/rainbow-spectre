/**
 * Patch to port old implementation of `webkitAudioContext`
 * to standards based `audioContext`.
 *
 * Props to Lajos György Mészáros <m_lajos@hotmail.com> for this patch, 
 * although some edits were needed to make it work.
 * 
 * @see https://github.com/meszaros-lajos-gyorgy/meszaros-lajos-gyorgy.github.io/blob/master/microtonal/monochord/js/webkit-audio-context-patch.js
 */

"use strict";

import { WaveType } from "./types";

declare global {
	interface AudioContext {
		createGainNode(): GainNode;
	}

	interface OscillatorNode {
		noteOff(when?: number): void;
		noteOn(when?: number): void;
	}
}

interface AudioContextConstructor {
	new (contextOptions?: AudioContextOptions | undefined): AudioContext;
	prototype: AudioContext;
}

interface OscillatorNodeConstructor {
	new (context: BaseAudioContext, options?: OscillatorOptions | undefined): OscillatorNode;
	prototype: OscillatorNode;
}

export default function() {
	let AudioContext: AudioContextConstructor,
		  OscillatorNode: OscillatorNodeConstructor;
	
	if(
		!window.hasOwnProperty("AudioContext")
		&& window.hasOwnProperty("webkitAudioContext")
	) {
		AudioContext = (<any>window).webkitAudioContext;
		OscillatorNode = window.OscillatorNode;
		
		if( !AudioContext.hasOwnProperty("createGain") ) {
			AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
		}
		
		if( !OscillatorNode.prototype.hasOwnProperty("start") ){
			OscillatorNode.prototype.start = OscillatorNode.prototype.noteOn;
		}
		
		// make the first parameter optional for firefox <30
		const oldStart = OscillatorNode.prototype.start;
		OscillatorNode.prototype.start = function(when: number = 0) {
			oldStart.call(this, when);
		};
		
		if( !OscillatorNode.prototype.hasOwnProperty("stop") ){
			OscillatorNode.prototype.stop = OscillatorNode.prototype.noteOff;
		}
		
		// make the first parameter optional for firefox <30
		const oldStop = OscillatorNode.prototype.stop;
		OscillatorNode.prototype.stop = function(when: number = 0) {
			oldStop.call(this, when);
		};
		
		Object.defineProperty(OscillatorNode.prototype, "type", {
			get: function() {
				return ["sine", "square", "sawtooth", "triangle", "custom"][this._type];
			},
			set: function(type: WaveType) {
				this._type = (OscillatorNode.prototype as any)[( type.toUpperCase() )] || type;
			}
		});
	}
};
