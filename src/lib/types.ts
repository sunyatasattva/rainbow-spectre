export type AllowedHarmonicLimit = "None" | 3 | 5 | 7 | 11 | "12-TET";

/**
 * [`hue`, `saturation`, `lightness`]
 */
export type HSLColor = [hue: number, saturation: number, lightness: number];

export enum ColorComponent {
  hue = 0,
  saturation = 1,
  lightness = 2
};

/**
  * @property  {number}   attack  The attack duration of the sound (in secs). See {@link Sound#createEnvelope}
  * @property  {number}   decay   The decay duration of the sound (in secs). See {@link Sound#createEnvelope}
  * @property  {number}   maxVolume The peak amplitude of the sound.
  * @property  {GainNode} node    The Gain Node associated with the sound. It won't emit any sound unless
  *                               connected to the `masterGain`. See {@link masterGain}.
  * @property  {number}   sustain The sustain duration of the sound (in secs). See {@link Sound#createEnvelope}
  * @property  {number}   release The release duration of the sound (in secs). See {@link Sound#createEnvelope}
  * @property  {number}   volume  The amplitude of the sound, after the decay. 1 is full amplitude.
  */
 export interface Envelope {
  attack: number;
  decay: number;
  node: GainNode;
  sustain: number;
  release: number;
}

export type Note = {
  accidental?: string,
  cents: number,
  name: string,
  octave: number
};

export interface Pitch {
	frequency: number;
}

export type Ratio = [numerator: number, denominator: number];

/**
  * @property  {number}   attack      The attack duration of the sound (in secs). See {@link Sound#createEnvelope}
  * @property  {number}   decay       The decay duration of the sound (in secs). See {@link Sound#createEnvelope}
  * @property  {number}   detune      The amount of cents to detune the frequency with. See {@link Sound#createOscillator}
  * @property  {float}    [maxVolume] The peak amplitude of the sound.
	* @property  {number}   release     The release duration of the sound (in secs). See {@link Sound#createEnvelope}
	* @property  {number}   sustain     The sustain duration of the sound (in secs). See {@link Sound#createEnvelope}
	* @property  {number}   type        The shape of the wave. See {@link Sound#createOscillator}
  * @property  {number}   volume      The amplitude of the sound, after the decay. 1 is full amplitude.
  */
export interface SoundOptions {
	attack: number;
	decay: number;
	detune: number;
	maxVolume?: number;
	release: number;
	sustain: number;
	type: WaveType;
  volume: number;
  weigh: boolean;
}

export type WaveType = "sine" | "square" | "sawtooth" | "triangle" | "custom";
