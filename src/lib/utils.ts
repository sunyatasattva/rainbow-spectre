import hexToHsl from "hex-to-hsl";
import Sound from "./tones";
import { Ratio } from "./types";

export function calculateColorsInterval(a: string, b: string) {
  const CENTS_PER_DEGREE = 1200 / 360;
  const [aHue] = hexToHsl(a);
  const [bHue] = hexToHsl(b);
  let difference = 360 + bHue - aHue;
  if(difference > 360) difference -= 360;

  return difference * CENTS_PER_DEGREE;
}

export function calculateColorsRatio(a: string, b: string) {
  const cents = calculateColorsInterval(a, b);
  console.log({cents});

  return Sound.centsToRatio(cents);
}

export function countDecimals(n: number) {
  return n % 1 === 0 ? 0 : n.toString().split(".")[1].length;
}

export function greatestCommonFactorOf(a: number, b: number): number {
  return b === 0 ? a : greatestCommonFactorOf(b, a % b); 
}

export function degToRad(n: number) {
  return (n * Math.PI) / 180;
}

export function playColorsInterval(a: string, b: string, f: number) {
  const ratio = calculateColorsRatio(a, b);
  
  Sound.play(f, { volume: 0.33 });
  Sound.play(f * ratio, { volume: 0.33 });
}

export function primeFactorsOf(n: number) {
  const factors = [];
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
