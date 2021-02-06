import { spectrumCoordinates, sRGBD65Matrix } from "./spectrum-coordinates";
import { clamp } from "./math";

type RGBColor = [r: number, g: number, b: number];
type RGBAColor = [r: number, g: number, b: number, a: number];

function isRGBA(color: RGBColor | RGBAColor): color is RGBAColor {
  return color.length === 4;
}

export const COLOR_INTENSITY_THRESHOLD = 0.0031308;
export const COLOR_FALLOFF_THRESHOLD = 60;
export const COLOR_TRANSFER_COEFFICIENT = 0.055;
/** 
 * Choosing a relatively high gamma value for more luminous results.
 * 
 * see: https://en.wikipedia.org/wiki/SRGB#Theory_of_the_transformation
 **/
export const GAMMA = 3
export const PHI = 12.92;

export const INFRARED_WL = 700;
export const ULTRAVIOLET_WL = 380;
export const SPEED_OF_LIGHT = 299_792_458;

export const NM_RESOLUTION = 5;

/**
 * Simple easing curve 
 */
function bezier(x: number, start = 0, end = 1) {
  const normalizedX = (x - start) / (end - start);
  
  return Math.pow(normalizedX, 2) * (3 - 2 * normalizedX);
}

export function calculateWavelengthFromAngle(angle: number) {
  return calculateWavelengthStep(360 - angle, 360);
}

export function calculateWavelengthStep(n: number, steps: number) {
  return n * (ULTRAVIOLET_WL / steps) + ULTRAVIOLET_WL
  - COLOR_FALLOFF_THRESHOLD / 2;
} 

/**
 * Eases out the intensity of colors at the tail ends of the visible spectrum.
 * 
 * Fades to black if RGB is provided, otherwise adds to the alpha channel.
 */
function correctColorIntensity(
  color: RGBColor | RGBAColor,
  wavelength: number
) {
  let start: number;
  let end: number;
  let k = 1;

  if(wavelength <= ULTRAVIOLET_WL + COLOR_FALLOFF_THRESHOLD) {
    start = ULTRAVIOLET_WL;
    end = ULTRAVIOLET_WL + COLOR_FALLOFF_THRESHOLD;

    k = bezier(wavelength, start, end);
  } else if(wavelength >= INFRARED_WL - COLOR_FALLOFF_THRESHOLD) {
    start = INFRARED_WL - COLOR_FALLOFF_THRESHOLD;
    end = INFRARED_WL;

    k = 1 - bezier(wavelength, start, end);
  }

  if( isRGBA(color) ) {
    const rgb = color.slice(0, 3);
  
    return rgb.every(c => c === 0) ? [0, 0, 0, 0]
      : [...color.slice(0, 3), k * color[3]];
  }
  else return color.map(channel => channel * k);
}

/**
 * see: https://en.wikipedia.org/wiki/SRGB#The_sRGB_transfer_function_(%22gamma%22)
 **/
function correctSRGBGamma(channel: number) {
  if(channel <= COLOR_INTENSITY_THRESHOLD)
    return PHI * channel;

  const k = COLOR_TRANSFER_COEFFICIENT;
  
  return (1 + k) * Math.pow(channel, 1 / GAMMA) - k;
}

function interpolate(idx: number, offset: number) {
  const target = spectrumCoordinates[idx];

  if(offset === 0) return target;

  const x0 = idx * NM_RESOLUTION;
  const x1 = x0 + NM_RESOLUTION;

  return target.map((coord, i) => {
    const y0 = coord;
    const y1 = spectrumCoordinates[idx + 1][i];

    return y0 + offset * (y1 - y0) / (x1 - x0);
  });
}

export function wavelengthToAudibleFrequency(wavelength: number) {
  const frequency = wavelengthToFrequency(wavelength) * 1e+12;

  return frequency / Math.pow(2, 41);
}

/**
 * @param wavelength wavelength in nm
 * @return frequency in THz
 */
export function wavelengthToFrequency(wavelength: number) {
  return ( SPEED_OF_LIGHT / (wavelength * 1e-9) ) / 1e+12;
}

export function waveLengthToRawRGB(wavelength: number): RGBColor {
  if(wavelength > INFRARED_WL
    || wavelength < ULTRAVIOLET_WL)
    return [0, 0, 0];

  const base = wavelength - ULTRAVIOLET_WL;
  const idx = Math.floor(base / NM_RESOLUTION);
  const offset = base - NM_RESOLUTION * idx;

  const [x, y, z] = interpolate(idx, offset);
  const matrix = sRGBD65Matrix;

  const rgb = matrix.map(channel => {
    const [mx, my, mz] = channel;

    const corrected = correctSRGBGamma(mx * x + my * y + mz * z);

    return clamp(corrected, 0, 1);
  });

  return rgb.map(channel => channel * 255) as RGBColor;
}

export function wavelengthToRGB(wavelength: number) {
  return correctColorIntensity(
    waveLengthToRawRGB(wavelength),
    wavelength
  );
}

export function wavelengthToRGBA(wavelength: number) {
  return correctColorIntensity(
    [...waveLengthToRawRGB(wavelength), 1],
    wavelength
  );
}
