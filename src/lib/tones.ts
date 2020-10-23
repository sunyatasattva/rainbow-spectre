/**
 * Tones module
 *
 * @module
 */

/* jshint maxlen:110 */

import { SoundOptions, Pitch, Envelope, WaveType } from "./types";
import { isPowerOfTwo, logBase } from "./utils";
import WebkitPatch from "./webkit-audiocontext-patch";

WebkitPatch();

export const ctx = new window.AudioContext();
export const masterGain = ctx.createGain();

const defaults: SoundOptions = {
  attack:  150,
  decay:   200,
  sustain: 0,
  release: 1250,
  volume:  1,
  detune:  0,
  type:    "sine"
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
		var gainNode = ctx.createGain();
		
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
		var oscillatorNode = ctx.createOscillator();
		
		oscillatorNode.frequency.value = frequency;
		oscillatorNode.detune.value    = detune;
		oscillatorNode.type            = type;
		
		return oscillatorNode;
	}

	/**
	 * Calculates the interval in cents between two pitches.
	 *
	 * @example
	 * Sound.intervalInCents( { frequency: 440 }, { frequency: 660 } ); // returns 702
	 *
	 * @param  {Pitch}  tone  Any object which implements a `frequency` property
	 *
	 * @return {Number}  The interval between the two sounds rounded to the closest cent.
	 */
	static intervalInCents(a: Pitch, b: Pitch) {
		const ratio = a.frequency / b.frequency;
		
		return Math.round( 1200 * logBase(2, ratio) );
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
		var targetFrequency = firstTone.frequency,
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
	 * Fades out a sound according to its release value. Useful for sustained sounds.
	 *
	 * @return {Promise<Sound>}
	 */
	fadeOut(): Promise<Sound> {
		const now  = ctx.currentTime;
		
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

  play() {
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
		
		return this;
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
