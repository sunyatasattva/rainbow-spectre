/**
 * @module tones/intervals
 */

interface Interval {
  alternateNames?: string[];
  name: string;
  short?: string;
}

const intervals: Record<string, Interval> = {
	"1/1": {
		"name": "Perfect unison",
		"short": "P1",
		"alternateNames": [
      "Monophony",
      "Perfect prime",
      "Tonic",
      "Fundamental"
    ]
	},
	"4375/4374": {
    "name": "Ragisma"
	},
	"2401/2400": {
    "name": "Breedsma"
  },
  "21/1200": {
    "name": "Cent"
  },
  "21/1000": {
    "name": "Millioctave"
  },
	"32805/32768": {
		"name": "Schisma"
	},
	"101/1000": {
    "name": "Savart",
    "alternateNames": [
      "Eptaméride"
    ]
  },
  "225/224": {
    "name": "Septimal kleisma",
    "alternateNames": [
      "Marvel comma"
    ]
  },
  "15625/15552": {
    "name": "Kleisma",
    "alternateNames": [
      "Semicomma majeur"
    ]
  },
  "2109375/2097152": {
    "name": "Semicomma",
    "alternateNames": [
      "Fokker's comma"
    ]
	},
	"21/96": {
    "name": "Sixteenth tone"
  },
  "1728/1715": {
    "name": "Orwell comma"
  },
  "126/125": {
    "name": "Small septimal semicomma",
    "alternateNames": [
      "Small septimal comma",
      "Starling comma"
    ]
  },
  "121/120": {
    "name": "Undecimal seconds comma"
  },
  "2048/2025": {
    "name": "Diaschisma",
    "alternateNames": [
      "Minor comma"
    ]
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
  "64/63": {
    "name": "Septimal comma",
    "alternateNames": [
      "Archytas' comma",
      "63rd subharmonic"
    ]
  },
  "56/55": {
    "name": "Undecimal diesis",
    "alternateNames": [
      "Ptolemy's enharmonic"
    ]
  },
  "21/36": {
    "name": "Sixth tone"
  },
  "50/49": {
    "name": "Jubilisma",
    "alternateNames": [
			"Septimal sixth tone",
      "Erlich's decatonic comma",
      "Tritonic diesis"
    ]
  },
  "49/48": {
    "name": "Septimal diesis",
    "alternateNames": [
      "Slendro diesis",
      "Septimal 1/6-tone"
    ]
  },
  "46/45": {
    "name": "Inferior quarter tone"
  },
  "45/44": {
    "name": "Undecimal diesis",
    "alternateNames": [
      "Undecimal fifth tone"
    ]
  },
  "21/30": {
    "name": "Fifth tone"
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
	"39/38": {
    "name": "Superior quarter-tone",
    "alternateNames": [
      "Novendecimal fifth tone"
    ]
  },
  "36/35": {
    "name": "Septimal quarter tone",
    "alternateNames": [
      "Septimal diesis",
      "Septimal chroma",
      "Superior quarter tone"
    ]
  },
  "246/239": {
    "name": "Just quarter tone"
  },
  "31/30": {
    "name": "Greater quarter-tone",
  },
  "28/27": {
    "name": "Septimal minor second",
    "alternateNames": [
      "Small minor second",
      "Inferior quarter tone"
    ]
  },
  "27/26": {
    "name": "Chromatic diesis",
    "alternateNames": [
      "Tridecimal comma"
    ]
  },
  "21/18": {
    "name": "Third tone"
  },
  "26/25": {
    "name": "Tridecimal third tone",
    "alternateNames": [
      "Third tone"
    ]
  },
  "21/16": {
    "name": "Narrow fourth",
    "alternateNames": [
      "Septimal fourth",
      "Wide augmented third",
    ]
  },
  "22/21": {
    "name": "Hard semitone"
  },
  "21/20": {
    "name": "Septimal chromatic semitone",
    "alternateNames": [
      "Minor semitone"
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
    "name": "Just minor semitone",
    "alternateNames": [
      "Arabic lute index finger"
    ]
	},
	"21/12": {
    "name": "Equal-tempered minor second",
    "alternateNames": [
      "Semitone"
    ]
  },
	"17/16": {
    "name": "Minor diatonic semitone",
    "alternateNames": [
      "Just major semitone",
      "Overtone semitone",
      "17th harmonic"
    ]
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
	"21/9": {
    "name": "Two-third tone"
  },
	"13/12": {
		"name": "Small neutral second",
		"alternateNames": [
			"Tridecimal subtone",
			"Three-quarters tone"
		]
	},
	"23/24": {
    "name": "Equal-tempered neutral second"
  },
  "800/729": {
    "name": "Grave whole tone",
    "alternateNames": [
      "Neutral second",
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
	"65536/59049": {
    "name": "Pythagorean minor tone",
    "alternateNames": [
      "Pythagorean diminished third"
    ]
  },
	"10/9": {
		"name": "Minor tone"
	},
	"22/12": {
    "name": "Equal-tempered major second"
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
	"256/225": {
    "name": "Just diminished third",
  },
  "125/108": {
    "name": "Semi-augmented whole tone",
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
	"75/64": {
    "name": "Just augmented second",
    "alternateNames": [
      "Augmented tone",
      "Augmented second"
    ]
  },
  "13/11": {
    "name": "Tridecimal minor third"
  },
  "32/27": {
    "name": "Pythagorean minor third semiditone",
  },
  "19/16": {
    "name": "Overtone minor third",
    "alternateNames": [
      "19-limit minor third",
    ]
  },
  "23/12": {
    "name": "Equal-tempered minor third"
  },
	"6/5": {
		"name": "Minor third",
		"short": "m3",
		"alternateNames": [
			"Semiditonus"
		]
	},
	"19683/16384": {
    "name": "Pythagorean augmented second"
  },
  "17/14": {
    "name": "Superminor third"
  },
  "243/200": {
    "name": "Acute minor third"
  },
  "128/105": {
    "name": "Septimal neutral third"
  },
  "11/9": {
    "name": "Undecimal neutral third"
  },
  "27/24": {
    "name": "Equal-tempered neutral third"
  },
	"16/13": {
		"name": "Tridecimal neutral third"
	},
	"100/81": {
    "name": "Grave major third"
  },
  "25/16": {
    "name": "Just augmented fifth"
  },
  "8192/6561": {
    "name": "Pythagorean diminished fourth",
    "alternateNames": [
      "Pythagorean 'schismatic' third"
    ]
  },
	"5/4": {
		"name": "Major third",
		"short": "M3",
		"alternateNames": [
			"Ditonus"
		]
	},
	"24/12": {
    "name": "Equal-tempered major third"
  },
  "81/64": {
    "name": "Pythagorean major third",
    "alternateNames": [
      "Ditone"
    ]
  },
  "14/11": {
    "name": "Undecimal diminished fourth"
  },
  "32/25": {
    "name": "Just diminished fourth"
  },
  "9/7": {
    "name": "Septimal major third",
    "alternateNames": [
      "Bohlen-Pierce third",
      "Super major Third"
    ]
  },
  "13/10": {
    "name": "Tridecimal major third",
    "alternateNames": [
      "Diminished fourth"
    ]
  },
  "125/96": {
    "name": "Just augmented third",
    "alternateNames": [
      "Augmented third"
    ]
  },
  "675/512": {
    "name": "Wide augmented third",
  },
	"4/3": {
		"name": "Perfect fourth",
		"short": "P4",
		"alternateNames": [
			"Diatessaron"
		]
	},
	"25/12": {
    "name": "Equal-tempered perfect fourth"
  },
  "27/20": {
    "name": "Imperfect fourth",
    "alternateNames": [
      "Acute fourth"
    ]
  },
  "27/16": {
    "name": "Pythagorean major sixth"
  },
  "15/11": {
    "name": "Undecimal augmented fourth"
  },
	"11/8": {
		"name": "Superfourth",
		"alternateNames": [
			"Undecimal semi-augmented fourth"
		]
	},
	"18/13": {
    "name": "Tridecimal augmented fourth"
  },
  "25/18": {
    "name": "Just augmented fourth"
  },
  "7/5": {
    "name": "Lesser septimal tritone",
    "alternateNames": [
      "Septimal tritone Huygens' tritone",
      "Bohlen-Pierce fourth",
      "Septimal fifth",
      "Septimal diminished fifth"
    ]
  },
  "1024/729": {
    "name": "Pythagorean diminished fifth",
    "alternateNames": [
      "Low Pythagorean tritone"
    ]
  },
	"45/32": {
		"name": "Augmented fourth",
		"short": "A4",
		"alternateNames": [
			"Tritone"
		]
	},
	"26/12": {
    "name": "Equal-tempered tritone"
  },
	"64/45": {
		"name": "Diminished fifth",
		"short": "d5",
		"alternateNames": [
			"Semitritone",
			"Semi-diapente"
		]
	},
	"729/512": {
    "name": "Pythagorean tritone",
    "alternateNames": [
      "Pythagorean augmented fourth",
      "High Pythagorean tritone"
    ]
  },
  "10/7": {
    "name": "Greater septimal tritone",
    "alternateNames": [
      "Septimal tritone",
      "Euler's tritone"
    ]
  },
  "36/25": {
    "name": "Just diminished fifth"
  },
	"16/11": {
		"name": "Undecimal subfifth"
	},
	"262144/177147": {
    "name": "Pythagorean diminished sixth"
  },
  "40/27": {
    "name": "5-limit wolf fifth",
    "alternateNames": [
      "Diminished sixth",
      "Grave fifth",
      "Imperfect fifth",
    ]
  },
  "27/12": {
    "name": "Equal-tempered perfect fifth"
  },
	"3/2": {
		"name": "Perfect fifth",
		"short": "P5",
		"alternateNames": [
			"Diapente"
		]
	},
	"192/125": {
    "name": "Classic diminished sixth"
  },
  "14/9": {
    "name": "Septimal minor sixth"
  },
  "11/7": {
    "name": "Undecimal minor sixth",
    "alternateNames": [
      "Undecimal augmented fifth",
      "Fibonacci numbers"
    ]
  },
  "128/81": {
    "name": "Pythagorean minor sixth"
  },
  "28/12": {
    "name": "Equal-tempered minor sixth"
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
	"6561/4096": {
    "name": "Pythagorean augmented fifth",
    "alternateNames": [
      "Pythagorean 'schismatic' sixth"
    ]
  },
  "233/144": {
    "name": "Golden ratio"
  },
  "81/50": {
    "name": "Acute minor sixth"
  },
	"13/8": {
		"name": "Neutral sixth",
		"short": "n6",
		"alternateNames": [
			"Tridecimal neutral sixth"
		]
	},
	"217/24": {
    "name": "Equal-tempered neutral sixth"
  },
  "18/11": {
    "name": "Undecimal neutral sixth",
    "alternateNames": [
      "Zalzal's neutral sixth"
    ]
  },
  "400/243": {
    "name": "Grave major sixth"
  },
  "32768/19683": {
    "name": "Pythagorean diminished seventh"
  },
	"5/3": {
		"name": "Major sixth",
		"short": "M6",
		"alternateNames": [
			"Hexachordum maius",
			"Tonus cum diapente"
		]
	},
	"29/12": {
    "name": "Equal-tempered major sixth"
  },
  "128/75": {
    "name": "Just diminished seventh",
    "alternateNames": [
      "Diminished seventh",
      "75th subharmonic"
    ]
  },
  "12/7": {
    "name": "Septimal major sixth"
  },
  "125/72": {
    "name": "Just augmented sixth"
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
	"225/128": {
    "name": "Just augmented sixth"
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
	"210/12": {
    "name": "Equal-tempered minor seventh"
  },
  "9/5": {
    "name": "Greater just minor seventh",
    "alternateNames": [
      "Large just minor seventh",
      "Bohlen-Pierce seventh"
    ]
  },
  "59049/32768": {
    "name": "Pythagorean augmented sixth"
  },
  "20/11": {
    "name": "Lesser undecimal neutral seventh",
    "alternateNames": [
      "Large minor seventh"
    ]
  },
  "729/400": {
    "name": "Acute minor seventh"
  },
  "64/35": {
    "name": "Septimal neutral seventh"
  },
  "11/6": {
    "name": "Undecimal neutral seventh",
    "alternateNames": [
      "Undecimal 'median' seventh"
    ]
  },
  "221/24": {
    "name": "Equal-tempered neutral seventh"
  },
  "50/27": {
    "name": "Grave major seventh"
  },
  "13/7": {
    "name": "Tridecimal neutral seventh"
  },
  "4096/2187": {
    "name": "Pythagorean diminished octave"
  },
	"15/8": {
		"name": "Major seventh",
		"short": "M7",
		"alternateNames": [
			"Heptachordum maius",
			"Ditonus cum diapente"
		]
	},
	"211/12": {
    "name": "Equal-tempered major seventh"
  },
  "256/135": {
    "name": "Octave − major chroma",
    "alternateNames": [
      "135th subharmonic",
      "Narrow diminished octave"
    ]
  },
  "243/128": {
    "name": "Pythagorean major seventh"
  },
  "48/25": {
    "name": "Classic diminished octave",
    "alternateNames": [
      "Large just major seventh"
    ]
  },
  "27/14": {
    "name": "Septimal major seventh"
  },
  "31/16": {
    "name": "Thirty-first harmonic",
    "alternateNames": [
      "Augmented seventh"
    ]
  },
  "35/18": {
    "name": "Septimal supermajor seventh",
    "alternateNames": [
      "Septimal quarter tone inverted"
    ]
  },
  "125/64": {
    "name": "Just augmented seventh",
    "alternateNames": [
      "125th harmonic"
    ]
  },
  "160/81": {
    "name": "Semi-diminished octave",
    "alternateNames": [
      "Octave − syntonic comma",
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

export const intervalsByName = Object.entries(intervals)
	.reduce((acc, curr) => {
		const [ratio, data] = curr,
					[num, den] = ratio.split("/"),
					n = +num / +den;

		acc[data.name] = n;
		if(data.alternateNames) {
			data.alternateNames.forEach(name => acc[name] = n);
		}

		if(data.short) acc[data.short] = n;

		return acc;
	}, {} as Record<string, number>);

export const parsedIntervals = Object.keys(intervals)
	.map(ratio => {
		const [num, den] = ratio.split("/");
		return +num / +den;
	});
