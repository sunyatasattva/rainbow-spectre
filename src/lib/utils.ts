import getPitchSet from "pitch-set";
import pitchSort from "pitch-sort";
import { HSLColor, Note, Ratio } from "./types";
import { logBase } from "./math";
import Sound from "./tones";
import {
  wavelengthToAudibleFrequency,
  calculateWavelengthFromAngle,
} from "./spectrum-calculator";

export const MIDI_A4 = 69;

export function calculateAngleInterval(a: number, b: number) {
  const CENTS_PER_DEGREE = 1200 / 360;
  let difference = 360 + b - a;
  if(difference > 360) difference -= 360;

  return difference * CENTS_PER_DEGREE;
}

export function calculateAngleFromRatio(ratio: Ratio | number) {
  if(typeof ratio !== "number") ratio = ratio[0] / ratio[1];

  return ( logBase(2, ratio) * 360 ) % 360;
}

export function calculateAngleRatio(a: number, b: number) {
  const cents = calculateAngleInterval(a, b);

  return Sound.centsToRatio(cents);
}

export function calculateColorsInterval(a: HSLColor, b: HSLColor) {
  const [aHue] = a;
  const [bHue] = b;

  return calculateAngleInterval(aHue, bHue);
}

export function calculateColorsRatio(a: HSLColor, b: HSLColor) {
  const cents = calculateColorsInterval(a, b);

  return Sound.centsToRatio(cents);
}

export function calculateFrequencyFromAngle(angle: number) {
  return wavelengthToAudibleFrequency(
    calculateWavelengthFromAngle(angle)
  );
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

export function playAngleInterval(a: number, b: number, f: number) {
  const ratio = calculateAngleRatio(a, b);

  return playInterval(ratio, f);
}

export function playInterval(ratio: number, f: number) {
  Sound.play(f, { volume: 0.33 });
  return Sound.play(f * ratio, { volume: 0.33 });
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
