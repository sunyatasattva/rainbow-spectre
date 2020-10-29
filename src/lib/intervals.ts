interface Interval {
  alternateNames?: string[];
  name: string;
  short?: string;
}

const intervals: Record<string, Interval> = {
	"1/1": {
		"name": "Perfect unison",
		"short": "P1"
	},
	"32805/32768": {
		"name": "Schisma"
	},
	"81/80": {
		"name": "Syntonic comma",
		"alternateNames": [
			"Major comma",
			"Chromatic diesis",
			"Comma of Didymus"
		]
	},
	"531441/524288": {
		"name": "Pythagorean comma",
		"alternateNames": [
			"Ditonic comma"
		]
	},
	"128/125": {
		"name": "Enharmonic diesis",
		"alternateNames": [
			"Enharmonic diesis",
			"Minor diesis",
			"Diminished second"
		]
	},
	"25/24": {
		"name": "Augmented unison",
		"short": "A1",
		"alternateNames": [
			"Minor chromatic semitone",
			"Minor semitone",
			"Small semitone"
		]
	},
	"256/243": {
		"name": "Limma",
		"alternateNames": [
			"Pythagorean limma"
		]
	},
	"135/128": {
		"name": "Chromatic semitone",
		"alternateNames": [
			"Major limma"
		]
	},
	"18/17": {
		"name": "Small septendecimal semitone"
	},
	"17/16": {
		"name": "Large septendecimal semitone"
	},
	"16/15": {
		"name": "Minor second",
		"short": "m2",
		"alternateNames": [
			"Diatonic semitone",
			"Major semitone",
			"Half tone"
		]
	},
	"2187/2048": {
		"name": "Apotome",
		"alternateNames": [
			"Pythagorean major semitone"
		]
	},
	"15/14": {
		"name": "Septimal diatonic semitone"
	},
	"14/13": {
		"name": "Supraminor second",
		"alternateNames": [
			"Trienthird",
			"Tridecimal supraminor second"
		]
	},
	"27/25": {
		"name": "Large limma"
	},
	"13/12": {
		"name": "Small neutral second",
		"alternateNames": [
			"Tridecimal subtone",
			"Three-quarters tone"
		]
	},
	"12/11": {
		"name": "Neutral second",
		"short": "n2",
		"alternateNames": [
			"Undecimal neutral second"
		]
	},
	"11/10": {
		"name": "Submajor second",
		"short": "n2",
		"alternateNames": [
			"Greater undecimal neutral second",
			"Ptolemy's second"
		]
	},
	"10/9": {
		"name": "Minor tone"
	},
	"9/8": {
		"name": "Major second",
		"short": "M2",
		"alternateNames": [
			"Tone",
			"Major tone",
			"Whole tone",
		]
	},
	"8/7": {
		"name": "Supermajor second",
		"short": "SM2",
		"alternateNames": [
			"Septimal major second"
		]
	},
	"7/6": {
		"name": "Subminor third",
		"short": "sm2",
		"alternateNames": [
			"Septimal minor third",
		]
	},
	"6/5": {
		"name": "Minor third",
		"short": "m3",
		"alternateNames": [
			"Semiditonus"
		]
	},
	"16/13": {
		"name": "Tridecimal neutral third"
	},
	"5/4": {
		"name": "Major third",
		"short": "M3",
		"alternateNames": [
			"Ditonus"
		]
	},
	"4/3": {
		"name": "Perfect fourth",
		"short": "P4",
		"alternateNames": [
			"Diatessaron"
		]
	},
	"11/8": {
		"name": "Superfourth",
		"alternateNames": [
			"Undecimal semi-augmented fourth"
		]
	},
	"45/32": {
		"name": "Augmented fourth",
		"short": "A4",
		"alternateNames": [
			"Tritone"
		]
	},
	"64/45": {
		"name": "Diminished fifth",
		"short": "d5",
		"alternateNames": [
			"Semitritone",
			"Semi-diapente"
		]
	},
	"16/11": {
		"name": "Undecimal subfifth"
	},
	"3/2": {
		"name": "Perfect fifth",
		"short": "P5",
		"alternateNames": [
			"Diapente"
		]
	},
	"8/5": {
		"name": "Minor sixth",
		"short": "m6",
		"alternateNames": [
			"Tetratonus",
			"Hexachordum minus",
			"Semitonus maius cum diapente"
		]
	},
	"13/8": {
		"name": "Neutral sixth",
		"short": "n6",
		"alternateNames": [
			"Tridecimal neutral sixth"
		]
	},
	"5/3": {
		"name": "Major sixth",
		"short": "M6",
		"alternateNames": [
			"Hexachordum maius",
			"Tonus cum diapente"
		]
	},
	"7/4": {
		"name": "Harmonic seventh",
		"short": "m7",
		"alternateNames": [
			"Septimal minor seventh",
			"Subminor seventh",
			"Augmented sixth"
		]
	},
	"16/9": {
		"name": "Minor seventh",
		"short": "m7",
		"alternateNames": [
			"Heptachordum minus",
			"Semiditonus cum diapente",
			"Pentatonus"
		]
	},
	"15/8": {
		"name": "Major seventh",
		"short": "M7",
		"alternateNames": [
			"Heptachordum maius",
			"Ditonus cum diapente"
		]
	},
	"2/1": {
		"name": "Perfect octave",
		"short": "P8",
		"alternateNames": [
			"Diapason"
		]
	},
}

export default intervals;
