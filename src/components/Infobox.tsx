import React, { useEffect, useState } from "react";
import { HSLColor, Note, Ratio } from "lib/types";
import "../styles/infobox.scss";
import ColorPicker from "./ColorPicker";
import DifferenceBar from "./DifferenceBar";
import { useOptions } from "hooks/useGlobalState";
import intervals, { equallyTemperedIntervals } from "lib/intervals";
import { fractionMax } from "lib/math";
import { wavelengthToAudibleFrequency } from "lib/spectrum-calculator";
import Sound from "lib/tones";
import {
  calculateColorsRatio,
  decimalsToCents,
  getEqualTemperedNoteNumber,
  MIDIToName
} from "lib/utils";
interface Props {
  angle?: number;
  colors: [HSLColor, HSLColor];
}

function calculateFrequencyFromAngle(angle: number) {
  return wavelengthToAudibleFrequency(
    ColorPicker.calculateWavelengthFromAngle(angle)
  );
}

function getIntervalName(ratio: [number, number]) {
  const [n, d] = ratio;
  const interval = intervals[`${n}/${d}`]
    || intervals[`${d}/${n}`]
    || equallyTemperedIntervals[Sound.ratioToCents(ratio)];

  return interval ? interval.name : "Unknown interval";
}

export default function Infobox(props: Props) {
  const [frequency, setFrequency] = useState(440);
  const [note, setNote] = useState<Note>({
    cents: 0,
    name: "A",
    octave: 4
  });
  const [intervalRatio, setIntervalRatio] = useState<Ratio>([0, 0]);
  const [intervalName, setIntervalName] = useState("");
  const [intervalsInCents, setIntervalsInCents] = useState([0, 0]);
  const [{ harmonicLimit, showVisibleSpectrumWheel }] = useOptions();
  const currentRatioLimit = Sound.harmonicLimitOf(intervalRatio);

  function badgeClassName() {
    const limitClass = `limit-${currentRatioLimit}`;
    const equalTemperament = harmonicLimit === "12-TET" ? "is-12-tet" : "";

    return `badge ${limitClass} ${equalTemperament}`;
  }

  function intervalNameClassName() {
    const isUnknownInterval = intervalName === "Unknown interval";

    return `interval-name ${isUnknownInterval ? "unknown-interval" : ""}`;
  }

  useEffect(() => {
    if(!props.angle) return;
    
    const frequency = calculateFrequencyFromAngle(props.angle);
    const noteNumber = getEqualTemperedNoteNumber(frequency, { round: false });
    const noteName = MIDIToName(noteNumber);
    
    setFrequency(frequency);
    setNote({
      ...noteName,
      cents: decimalsToCents(noteNumber)
    });
  }, [props.angle]);

  useEffect(() => {
    const [a, b] = props.colors;
    const ratio = calculateColorsRatio(a, b);
    const ratioInCents = Sound.ratioToCents(ratio);
    const interval = harmonicLimit !== "None" ?
      Sound.getClosestIntervalTo( calculateColorsRatio(a, b), harmonicLimit )
      : fractionMax(ratio, 100);
    const intervalInCents = Sound.ratioToCents(interval);

    setIntervalRatio(interval);
    setIntervalName(getIntervalName(interval));
    setIntervalsInCents([ratioInCents, intervalInCents]);
  }, [props.colors, harmonicLimit]);

  return (
    <div className="infobox">
      {showVisibleSpectrumWheel ?
        <div className="note-container">
          <div className="note-details">
            <span className="note-name">{note.name}</span>
            {note.accidental ?
              <span className="note-accidentals">{note.accidental}</span>
              : null
            }
            <sub>{note.octave}</sub>
          </div>
          <div className="frequency">
            {frequency.toFixed(2)} Hz
          </div>
        </div>
        :
        <>
          {currentRatioLimit >= 3 ?
            <div className={badgeClassName()}>
              {harmonicLimit === "12-TET" ?
                harmonicLimit
                : `${currentRatioLimit}-limit`
              }
            </div>
            : null
          }
          <div className="interval-container">
          <div className="interval">
            <sup>{intervalRatio[0]}</sup>
            <span>/</span>
            <sub>{intervalRatio[1]}</sub>
          </div>
          <div className={intervalNameClassName()}>
            {intervalName}
          </div>
        </div>
        </>
      }
      {harmonicLimit !== "None" ?
        <DifferenceBar value={
          !showVisibleSpectrumWheel ? intervalsInCents[0] - intervalsInCents[1]
          : note.cents
        } />
        : null
      }
    </div>
  )
}
