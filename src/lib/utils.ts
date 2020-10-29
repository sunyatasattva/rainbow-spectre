import hexToHsl from "hex-to-hsl";
import Sound from "./tones";

export function calculateColorsRatio(a: string, b: string) {
  const [aHue] = hexToHsl(a);
  const [bHue] = hexToHsl(b);

  return 1 + Math.abs(degreesToRad(bHue - aHue) / (2 * Math.PI));
}

export function degreesToRad(n: number) {
  return (n * Math.PI) / 180;
}

export function playColorsInterval(a: string, b: string, f: number) {
  const ratio = calculateColorsRatio(a, b);
  
  Sound.play(f, { volume: 0.33 });
  Sound.play(f * (1 / ratio), { volume: 0.33 });
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
