/**
 * Tones module
 *
 * @module tones/main
 */

/* jshint maxlen:110 */

import frac from "frac";
import { SoundOptions, Pitch, Envelope, WaveType, Ratio } from "./types";
import { fractionMax, isPowerOfTwo, logBase, primeFactorsOf } from "./utils";
import WebkitPatch from "./webkit-audiocontext-patch";
import { parsedIntervals } from "./intervals";

WebkitPatch();

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

export const ctx = new AudioContext();
export const masterGain = ctx.createGain();

const defaults: SoundOptions = {
  attack:  150,
  decay:   200,
  sustain: 0,
  release: 1250,
  volume:  1,
  detune:  0,
	type:    "sine",
	weigh:   false
}

export const sounds: Sound[] = [];

masterGain.connect(ctx.destination);

export default class Sound implements Pitch {
  detune:     number;
  duration:   number;
  envelope:   Envelope & { maxVolume: number; volume: number };
  frequency:  number;
	isPlaying:  boolean = false;
	isStopping: boolean = false;
  oscillator: OscillatorNode;
  waveType:   OscillatorType;

	/**
	 * Creates and initializes a Sound object.
	 *
	 * Constructor accepts an optional `opts` argument.
	 *
	 * @param  {number}  frequency         The frequency of the wave
	 * @param  {SoundOptions}  [opts]      Options for the playing frequency
	 * @param  {number}  [opts.attack]     The attack duration of the sound (in ms). See {@link Sound#createEnvelope}
	 * @param  {number}  [opts.decay]      The decay duration of the sound (in ms). See {@link Sound#createEnvelope}
	 * @param  {number}  [opts.detune]     The amount of cents to detune the frequency with.
	 *                                     See {@link Sound#createOscillator}
	 * @param  {float}   [opts.maxVolume]  The maximum amplitude of the sound, reached after the attack.
	 *                                     1 is full amplitude. If not provided, will default to volume.
	 * @param  {number}  [opts.release]    The release duration of the sound (in ms). See {@link Sound#createEnvelope}
	 * @param  {number}  [opts.sustain]    The sustain duration of the sound (in ms). See {@link Sound#createEnvelope}
	 * @param  {string}  [opts.type]       The shape of the wave. See {@link Sound#createOscillator}
	 * @param  {float}   [opts.volume]     The amplitude of the sound, after the decay. 1 is full amplitude.
	 * @param  {boolean} [opts.weigh]      Whether to lower the volume for higher frequencies
	 *
	 * @return {Sound}  The Sound object.
	 */
  constructor(frequency: number, options?: Partial<SoundOptions>) {
		const opts: SoundOptions = { ...defaults, ...options },
		      envelope   = this.createEnvelope(opts.attack, opts.decay, opts.sustain, opts.release),
          oscillator = this.createOscillator(frequency, opts.detune, opts.type);

		this.envelope = {
			...envelope,
			maxVolume: opts.maxVolume || opts.volume,
			volume:    opts.volume
		};
		this.oscillator = oscillator;
    this.frequency  = oscillator.frequency.value;
		this.detune     = oscillator.detune.value;
    this.waveType   = oscillator.type;

		this.duration = envelope.attack + envelope.decay + envelope.sustain + envelope.release;

		if(opts.weigh) {
			this.envelope.maxVolume = this.weighFrequencyLoudness(frequency) * this.envelope.maxVolume;
			this.envelope.volume    = this.weighFrequencyLoudness(frequency) * this.envelope.volume;
		}
		
		oscillator.connect(envelope.node);
		envelope.node.connect(masterGain);

		sounds.push(this);
	}

	/**
	 * Creates the ADSR Envelope for the sound
	 *
	 * The parameters should be passed in milliseconds.
	 *
	 * @param  {number}  attack  The amount of time the sound will take to reach full amplitude
	 * @param  {number}  decay   The amount of time for the sound to reach sustain amplitude after attack
	 * @param  {number}  sustain The duration of the sound is kept being played. If `sustain` is < 0, the
	 *                           sound will be played until manually stopped
	 * @param  {number}  release The amount of time for the sound to fade out
	 *
	 * @return {Envelope}  The envelope object, containing the gain node.
	 */
	private createEnvelope(attack: number, decay: number, sustain: number, release: number): Envelope {
		const gainNode = ctx.createGain();
		
		gainNode.gain.setValueAtTime(0, ctx.currentTime);
		
		return {
			node:    gainNode,
			attack:  attack / 1000,
			decay:   decay / 1000,
			sustain: sustain / 1000,
			release: release / 1000
		};
	}
	
	/**
	 * Creates an Oscillator
	 *
	 * @param  {number}   frequency     The frequency of the wave
	 * @param  {number}   [detune=0]    The number of cents to manipulate the frequency of the wave
	 * @param  {WaveType} [type="sine"] The shape of the wave.
	 *
	 * @return {OscillatorNode}  The oscillator node
	 */
	private createOscillator(frequency: number, detune: number = 0, type: WaveType = "sine") {
		const oscillatorNode = ctx.createOscillator();
		
		oscillatorNode.frequency.value = frequency;
		oscillatorNode.detune.value    = detune;
		oscillatorNode.type            = type;
		
		return oscillatorNode;
	}
	
	/**
	 * Weighs the loudness of a frequency depending on its height.
	 *
	 * It cuts off the most frequencies in the range of 2k–6k.
	 *
	 * @param  {number}  f  The frequency to weigh.
	 *
	 * @return {number}  A weighed number from 0 to 1 to apply to loudness of the sound.
	 */
	private weighFrequencyLoudness(f: number) {
		const a = -1.5768 * Math.pow(10, -12),
		      b = 3.70162 * Math.pow(10, -8),
		      c = -0.000220906,
		      d = 1.05609;

		return a * Math.pow(f, 3) + b * Math.pow(f, 2) + c * f + d;
	}

	/**
	 * Given a number of cents, returns the equivalent ratio.
	 * 
	 * @param   {number}  cents  Amount of cents 
	 * 
	 * @return  {number}  The ratio represented by those cents.
	 */
	static centsToRatio(cents: number) {
		return Math.pow(2, cents / 1200);
	}

	/**
	 * Duplicates a Sound.
	 * 
	 * @param   {Sound}         sound   The sound to duplicate
	 * @param   {SoundOptions}  [opts]  Sound options to override 
	 * 
	 * @return  {Sound}  The duplicated sound.
	 */
	static duplicateSound(sound: Sound, opts?: SoundOptions) {
		const options = {
			...sound.envelope,
			attack: sound.envelope.attack * 1000,
			decay: sound.envelope.decay * 1000,
			sustain: sound.envelope.sustain * 1000,
			release: sound.envelope.release * 1000,
			...opts
		};

		return new Sound(sound.frequency, options);
	}

	/**
	 * Get the closest `n-limit` interval to a given number
	 * 
	 * Rounds a decimal number to the closest fraction which respects
	 * a given harmonic limit. Obviously, the higher the limit, the lower
	 * the rounding. The allowed fractions are limited to the ones listed
	 * in the interval list.
	 * 
	 * @see module:tones/intervals
	 *  
	 * @param {Number} n      The number to round
	 * @param {Number} limit  The desired harmonic space
	 * 
	 * @return {Ratio}  The closest named ratio
	 */
	static getClosestIntervalTo(n: number, limit: 3 | 5 | 7 | 11 | "12-TET") {
		let interval;

		if(limit === "12-TET") {
			interval = Sound.centsToRatio(
				Math.round(Sound.ratioToCents(n) / 100) * 100
			);
		} else {
			interval = parsedIntervals.reduce((acc, curr) => {
				return Math.abs(curr - n) < Math.abs(acc - n)
					&& Sound.harmonicLimitOf(curr) <= limit ? curr : acc;
			});
		}

		return fractionMax(interval, 1000);
	}

	/**
	 * Calculates the harmonic limit of a ratio
	 * 
	 * The harmonic limit of a given ratio is the largest prime number in which
	 * both its numerator and denominator can be factored into.
	 * 
	 * @see https://en.wikipedia.org/wiki/Limit_(music)
	 * 
	 * @param {Number | Ratio}  n  The number to calculate the harmonic limit of
	 * 
	 * @return {Number}  The prime number representing the harmonic limit
	 */
	static harmonicLimitOf(n: number | Ratio) {
		let num, den;

		if( Array.isArray(n) ) [num, den] = n;
		else [num, den] = fractionMax(n, 1000);
	
		const factors = [...primeFactorsOf(num), ...primeFactorsOf(den)];

		return Math.max(...factors);
	};

	/**
	 * Calculates the interval in cents between two pitches.
	 *
	 * @example
	 * Sound.intervalInCents( { frequency: 440 }, { frequency: 660 } ); // returns 702
	 *
	 * @param  {Pitch}   a  Any object which implements a `frequency` property
	 * @param  {Pitch}   b  Any object which implements a `frequency` property
	 * @param  {boolean} reduceToOctave  Calculate the interval reducing `b` to the same octave as `a`
	 *
	 * @return {Number}  The interval between the two sounds rounded to the closest cent.
	 */
	static intervalInCents(a: Pitch, b: Pitch, reduceToOctave?: boolean) {
		let referenceFrequency = b.frequency;

		if(reduceToOctave)
			referenceFrequency = Sound.reduceToSameOctave(b, a);
		
		return Sound.ratioToCents([a.frequency, referenceFrequency]);
	};

	/**
	 * Calculates the approximate interval ratio with another tone.
	 *
	 * @example
	 * // Assume `sound` has a frequency of 440Hz
	 * Sound.intervalRatio({ frequency: 440 }, { frequency: 660 }); // returns [0, 3, 2]
	 *
	 * @param  {Pitch}  a  Any object which implements a `frequency` property
	 * @param  {Pitch}  b  Any object which implements a `frequency` property
	 * @param  {boolean} reduceToOctave  Calculate the interval reducing `b` to the same octave as `a`
	 *
	 * @return {Array}  The return value is an array of the form `[quot, num, den]`
	 *                  where `quot === 0` for improper fractions.
	 */
	static intervalRatio(a: Pitch, b: Pitch, reduceToOctave: boolean) {
		let referenceFrequency = b.frequency;

		if(reduceToOctave)
			referenceFrequency = Sound.reduceToSameOctave(b, a);

		return frac(a.frequency / referenceFrequency, 999);
	};

	/**
	 * Calculates if one pitch is an octave equivalent of another pitch.
	 *
	 * @example
	 * Sound.isOctaveOf( { frequency: 440 }, { frequency: 110 } ); // returns true
	 *
	 * @param  {Pitch}  a  Any object which implements a `frequency` property
	 * @param  {Pitch}  b  Any object which implements a `frequency` property
	 *
	 * @return {bool}
	 */
	static isOctaveOf(a: Pitch, b: Pitch) {
		return isPowerOfTwo( a.frequency / b.frequency );
	};

	/**
	 * Reduces the Sound pitch to a tone within an octave of the tone.
	 *
	 * @param  {Pitch} firstTone       Any object which implements a `frequency` property
	 * @param  {Pitch} referenceTone   The first sound will adjust its frequency
	 *                                 to the same octave as this tone
	 * @param  {bool}  [excludeOctave] If set to `true`, the exact octave will be reduced
	 *                                 to the unison of the original sound
	 *
	 * @return {Number}  The frequency of the first sound within the same octave as the reference tone.
	 */
	static reduceToSameOctave(firstTone: Pitch, referenceTone: Pitch, excludeOctave?: boolean){
		let targetFrequency = firstTone.frequency,
				ratio           = targetFrequency / referenceTone.frequency;

		if( excludeOctave ) {
			while( ratio <= 0.5 || ratio >= 2 ){
				if( ratio <= 0.5 )
					targetFrequency = targetFrequency * 2;
				else
					targetFrequency = targetFrequency / 2;

				ratio = targetFrequency / referenceTone.frequency;
			}
		} else {
			while( ratio < 0.5 || ratio > 2 ){
				if( ratio < 0.5 )
					targetFrequency = targetFrequency * 2;
				else
					targetFrequency = targetFrequency / 2;

				ratio = targetFrequency / referenceTone.frequency;
			}
		}

	return targetFrequency;
	}

	/**
	 * Immediately plays a given frequency.
	 *
	 * Also accepts an optional `opts` argument.
	 *
	 * @return {Sound}  The Sound object.
	 */
	static play(frequency: number, opts?: Partial<SoundOptions>) {
		const thisSound = new Sound(frequency, opts);

		return thisSound.play();
	}

	/**
	 * Plays a sequence of sounds.
	 * 
	 * @param  {Sound[]}  sounds       An array of `Sound` objects to play
	 * @param  {Object}   [opts]       An options object
	 * @param  {boolean}  [opts.copy]  Whether to make a duplicate of the sound before playing.
	 *                                 This allows not to modify the original object and being able to
	 *                                 play the same array of sounds several times.
	 */
	static playSequence(sounds: Sound[], opts?: { copy?: boolean }) {
		if(opts && opts.copy)
			sounds = sounds.map((sound) => Sound.duplicateSound(sound));
	
		return sounds.reduce(
			(acc, curr) => {
				return acc.then(() => curr.play());
			},
			Promise.resolve() as unknown as Promise<Sound>
		);
	}

	/**
	 * Converts a given decimal number or ratio to its value in cents
	 * 
	 * @param {Number | Ratio} n  The number to convert 
	 * 
	 * @return {Number} Value in cents of the given ratio
	 */
	static ratioToCents(n: number | Ratio) {
		if( Array.isArray(n) ) n = n[0] / n[1];

		return Math.round( 1200 * logBase(2, n) );
	}

	/**
	 * Duplicate this sound
	 * 
	 * @see {@link Sound.duplicateSound}
	 */
	duplicate() {
		return Sound.duplicateSound(this);
	}

	/**
	 * Fades out a sound according to its release value. Useful for sustained sounds.
	 *
	 * @return {Promise<Sound>}
	 */
	fadeOut(): Promise<Sound> {
		const now  = ctx.currentTime;
		
		this.envelope.node.gain.cancelScheduledValues(now);
		this.envelope.node.gain.setTargetAtTime( 0, now, this.envelope.release / 5 );
		this.isPlaying = false;
		this.isStopping = true;
		
		return new Promise((resolve) => {
			setTimeout(
				() => {
					this.stop();
					resolve(this);
				}, 
				this.envelope.release * 1250
			);
		});
	};

	/**
	 * Calculates the interval in cents with another tone.
	 *
	 * @example
	 * // Assume `sound` has a frequency of 440Hz
	 * sound.intervalInCents( { frequency: 660 } ); // returns 702
	 *
	 * @see {@link Sound.intervalInCents}
	 */
	intervalInCents(tone: Pitch) {
		return Sound.intervalInCents(this, tone);
	};

	/**
	 * Calculates if another tone is an octave of the sound.
	 *
	 * @example
	 * // Assume `sound` has a frequency of 440Hz
	 * sound.isOctaveOf( { frequency: 110 } ); // returns true
	 *
	 * @see {@link Sound.isOctaveOf}
	 */
	isOctaveOf(tone: Pitch) {
		return Sound.isOctaveOf(this, tone);
	};

  play(): Promise<Sound> {
		const now = ctx.currentTime;
		const { attack, decay, maxVolume, node, release, sustain, volume } = this.envelope;

    this.oscillator.start();
		this.isPlaying = true;
		
		/**
		 * Using `setTargetAtTime` because `exponentialRampToValueAtTime` doesn't seem to work properly under
		 * the current build of Chrome I'm developing in. Not sure if a bug, or I didn't get something.
		 * `setTargetAtTime` gets the `timeCostant` as third argument, which is the amount of time it takes
		 * for the curve to reach 1 - 1/e * 100% of the target. The reason why the provided arguments are divided
		 * by 5 is because after 5 times worth of the Time Constant the value reaches 99.32% of the target, which
		 * is an acceptable approximation for me.
		 *
		 * @see {@link https://en.wikipedia.org/wiki/Time_constant}
		 *
		 * @todo put an if with opts.linear = true to use linearRampToValueAtTime instead
		 */
		
		node.gain
			// The note starts NOW from 0 and will get to `maxVolume` in approximately `attack` seconds
			.setTargetAtTime( maxVolume, now, attack / 5 )
			// After `attack` seconds, start a transition to fade to sustain volume in `decay` seconds
			.setTargetAtTime( volume, now + attack, decay / 5 );
	
		if( sustain >= 0 ) {
			node.gain
				// Setting a "keyframe" for the volume to be kept until `sustain` seconds have passed
				// (plus all the rest)
				.setValueAtTime(
					volume,
					now + attack + decay + sustain
				)
				// Fade out completely starting at the end of the `sustain` in `release` seconds
				.setTargetAtTime(
					0,
					now + attack + decay + sustain,
					release / 5
				);
		}
		
		// Start the removal of the sound process after a little more than the sound duration to account for
		// the approximation. (To make sure that the sound doesn't get cut off while still audible)
		return new Promise((resolve) => {
			let effectiveSoundDuration = attack + decay + sustain;
			
			setTimeout( () => resolve(this), effectiveSoundDuration * 1000 );
			
			setTimeout( () => {
				if( !this.isStopping ) this.stop();
			}, this.duration * 1250 );
		});
	}
	
	/**
	 * Reduces the Sound pitch to a tone within an octave of the tone.
	 *
	 * @example
	 * // Assume `sound` has a frequency of 440Hz
	 * sound.reduceToSameOctaveAs( { frequency: 65.41 } ); // sets the sound frequency to 110Hz
	 *
	 * @example
	 * // Assume `sound` has a frequency of 440Hz
	 * sound.reduceToSameOctaveAs( { frequency: 220 }, true ); // sets the sound frequency to 220Hz
	 *
	 * @example  <caption>The function works upwards as well</caption>
	 * // Assume `sound` has a frequency of 440Hz
	 * sound.reduceToSameOctaveAs( { frequency: 523.25 } ); // sets the sound frequency to 880Hz
	 *
	 * @param  {Pitch} tone    Any object which implements a `frequency` property
	 * @param  {bool}  excludeOctave  If this option is `true`, the exact octave will be reduced
	 *                                to the unison of the original sound
	 *
	 * @return {Sound}  The original Sound object is returned
	 */
	reduceToSameOctaveAs(tone: Pitch, excludeOctave?: boolean){
		this.frequency = Sound.reduceToSameOctave(this, tone, excludeOctave);

		this.oscillator.frequency.setValueAtTime( this.frequency, ctx.currentTime );

		return this;
	};

  /**
   * Disconnects a sound and removes it from the array of active sounds.
   *
   * @return {Sound}  The Sound object that was removed
   */
  remove() {
    try {
      this.oscillator.disconnect(this.envelope.node);
      this.envelope.node.gain.cancelScheduledValues(ctx.currentTime);
      this.envelope.node.disconnect(masterGain);
    } catch (e) {
      console.error("Error while disconnecting a sound", e);
    }

    const soundIdx = sounds.indexOf(this);

    return soundIdx !== -1 ? sounds.splice(soundIdx, 1)[0] : this;
  }

  /**
   * Stops a sound, removing it.
   *
   * @see {@link Sound#remove}
   *
   * @return  {Sound}  The stopped Sound
   */
  stop() {
    this.oscillator.stop();
    
    return this.remove();
  };
}
