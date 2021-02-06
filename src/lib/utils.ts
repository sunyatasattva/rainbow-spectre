import getPitchSet from "pitch-set";
import pitchSort from "pitch-sort";
import { wavelengthToFrequency } from "./spectrum-calculator";
import Sound from "./tones";
import { HSLColor, Note, Ratio } from "./types";

export const MIDI_A4 = 69;

export function calculateColorsInterval(a: HSLColor, b: HSLColor) {
  const CENTS_PER_DEGREE = 1200 / 360;
  const [aHue] = a;
  const [bHue] = b;
  let difference = 360 + bHue - aHue;
  if(difference > 360) difference -= 360;

  return difference * CENTS_PER_DEGREE;
}

export function calculateColorsRatio(a: HSLColor, b: HSLColor) {
  const cents = calculateColorsInterval(a, b);

  return Sound.centsToRatio(cents);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(
    Math.max(n, min),
    max
  );
};

export function countDecimals(n: number) {
  return n % 1 === 0 ? 0 : n.toString().split(".")[1].length;
}

export function greatestCommonFactorOf(a: number, b: number): number {
  return b === 0 ? a : greatestCommonFactorOf(b, a % b); 
}

export function hslToString(hsl: HSLColor) {
  const [h, s, l] = hsl;

  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Transforms the decimals in a number into the difference in cents to the closest integer.
 *
 * @param  {number}  n  The number
 *
 * @return {number}  The cents (within -50 and +50) difference to the closest integer.
 */
export function decimalsToCents(n: number) {
  const decimals = n % 1;
  
  return decimals > 0.5 ?
    -Math.round( (1 - decimals) * 100 )
    : Math.round(decimals * 100);
}

export function degToRad(n: number) {
  return (n * Math.PI) / 180;
}

export function degToPercent(n: number) {
  return +(n / 360 * 100).toFixed(2);
}

/**
 * Encodes the accidentals in a string with the correct HTML entity.
 *
 * @todo  Currently doesn't correctly encode double/triple accidentals e.g. F##
 *
 * @param  {string}  str  A string to check for accidentals
 *
 * @return {string}  The correctly encoded accidental
 */
export function encodeAccidentals(str: string){
  if( str.match(/#/g) )
    return "\u266F";
  else if( str.match(/b/g) )
    return "\u266D";
  else
    return "";
}

/**
 * Derives the note number in an equal tempered system given a reference frequency.
 *
 * @param  {number}  frequency                 The frequency to check
 * @param  {number}  [referenceFrequency=440]  A reference point for the Equal Tempered system
 * @param  {number}  [referencePoint=69]        The point in the scale for the reference frequency.
 *                                             E.g. in MIDI A440 is 69, while in a regular
 *                                             piano the same note is in the 49th position.
 * @param  {number}  [semitones=12]            The number of semitones in an octave
 * @param  {boolean} [round=true]              Whether or not to round the note position
 *
 * @return {number}  The note position in relationship to the reference point
 */
/* jshint ignore:start */ // JsHint can't deal with this pro destructuring syntax
export function getEqualTemperedNoteNumber(
  frequency: number,
  { referenceFrequency = 440,
    referencePoint = MIDI_A4,
    semitones = 12,
    round = false
  }: 
  {
    referenceFrequency?: number,
    referencePoint?: number,
    round?: boolean,
    semitones?: number
  } = {}
) {
  const n = semitones * logBase(2, frequency / referenceFrequency) +
    referencePoint;

  return round ? Math.round(n) : n;
}

/**
 * Given a MIDI note number it returns the name for that note.
 *
 * Technically it would work with any 12 tone Equal Temperament reference
 * as long as it starts on a C.
 *
 * @param  {number}   n           The MIDI number
 * @param  {string[]} [pitchSet]  An Array of Pitches to get the desired name
 *                                of the note.
 *
 * @return The name of the note and the relative octave
 */
export function MIDIToName(n: number, pitchSet?: string[]): Omit<Note, "cents"> {
  n = Math.round(n);
  pitchSet = pitchSet ? pitchSort(pitchSet)
    : getPitchSet("P1 m2 M2 m3 M3 P4 4A P5 m6 M6 m7 M7", "C");
    
  const name = pitchSet[n % 12];
  const octave = Math.floor(n / 12) - 1;

  return {
    octave,
    accidental: encodeAccidentals(name),
    name: name[0]
  }
}

export function playColorsInterval(a: HSLColor, b: HSLColor, f: number) {
  const ratio = calculateColorsRatio(a, b);
  
  Sound.play(f, { volume: 0.33 });
  Sound.play(f * ratio, { volume: 0.33 });
}

export function primeFactorsOf(n: number) {
  const factors = [1];
  let factor = 2;

  while(n >= 2) {
    if(n % factor !== 0) factor++;
    else {
      factors.push(factor);
      n /= factor;
    }
  }

  return factors;
}

export function radToDeg(x: number) {
  const theta = x * 180 / Math.PI;

  return theta < 0 ? theta + 360 : theta;
}

export function setStateProp<
  T,
  K extends keyof T
>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  key: K,
  val: T[K]
) {
  return setState((prev) => {
    return {
      ...prev,
      [key]: val
    };
  });
}

export function fraction(n: number): Ratio {
  const dec = countDecimals(n);
  if(dec === 0) return [n, 1];

  let den = Math.pow(10, dec);
  let num = n * den;
  const gcf = greatestCommonFactorOf(num, den);

  return [num / gcf, den / gcf]
}

export function fractionMax(n: number, max: number = 100): Ratio {
  let [num, den] = fraction(n);

  if(max < 1) throw new Error("Maximum denominator should be at least 1");
  if(den <= max) return [num, den];

  let p0 = 0,
      q0 = 1,
      p1 = 1,
      q1 = 0;

  while(true) {
    let a = Math.floor(num / den),
        p2 = p0 + a * p1,
        q2 = q0 + a * q1,
        d2 = num - a * den;
      
    if(q2 > max) break;

    p0 = p1;
    q0 = q1;
    p1 = p2;
    q1 = q2;
    num = den;
    den = d2;
  }

  return [p1, q1];
}

export function wavelengthToAudibleFrequency(wavelength: number) {
  const frequency = wavelengthToFrequency(wavelength) * 1e+12;

  return frequency / Math.pow(2, 40);
}

/**
  * Checks if a number is a power of two
  *
  * @param  {number}  n  The number to check
  *
  * @return {bool}
  */
export function isPowerOfTwo(n: number){
  // Another idea would be isInteger( logBase(2, n) )
  // @see http://www.graphics.stanford.edu/~seander/bithacks.html#DetermineIfPowerOf2
  return ( n !== 0 && ( n & (n - 1) ) === 0 );
}

/**
	* Calculates a logarithm of a number in an arbitrary base
	*
	* @param  {number}  base  The logarithm base
	* @param  {number}  n     The number
	*
	* @return {number}  log<sub>base</sub>(n)
	*/
export function logBase(base: number, n: number) {
	return Math.log(n) / Math.log(base);
}
