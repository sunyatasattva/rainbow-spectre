import React, { useEffect, useState } from "react";
import { Note as NoteInfo } from "lib/types";
import DifferenceBar from "./DifferenceBar";
import {
  decimalsToCents,
  getEqualTemperedNoteNumber,
  MIDIToName
} from "lib/utils";
import { frequencyToWavelength } from "lib/spectrum-calculator";

interface Props {
  frequency: number;
}

export default function Note(props: Props) {
  const { frequency } = props;
  const [note, setNote] = useState<NoteInfo>({
    cents: 0,
    name: "A",
    octave: 4
  });

  useEffect(() => {
    const noteNumber = getEqualTemperedNoteNumber(frequency, { round: false });
    const noteName = MIDIToName(noteNumber);

    setNote({
      ...noteName,
      cents: decimalsToCents(noteNumber)
    });
  }, [frequency]);

  return (
    <>
      <div className="badge">
        {`${frequencyToWavelength(frequency).toFixed(1)} nm`}
      </div>
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
          {frequency.toFixed(1)} Hz
        </div>
      </div>
      <DifferenceBar readonly value={note.cents} />
    </>
  )
}