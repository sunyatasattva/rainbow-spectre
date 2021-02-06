import React, { useEffect, useState } from "react";
import { HSLColor } from "lib/types";
import "../styles/infobox.scss";
import ColorPicker from "./ColorPicker";
import Interval from "./Interval";
import Note from "./Note";
import { useOptions } from "hooks/useGlobalState";
import { wavelengthToAudibleFrequency } from "lib/spectrum-calculator";
import { calculateColorsRatio } from "lib/utils";
interface Props {
  angle?: number;
  colors: [HSLColor, HSLColor];
}

function calculateFrequencyFromAngle(angle: number) {
  return wavelengthToAudibleFrequency(
    ColorPicker.calculateWavelengthFromAngle(angle)
  );
}

export default function Infobox(props: Props) {
  const [frequency, setFrequency] = useState(440);
  const [{ harmonicLimit, showVisibleSpectrumWheel }] = useOptions();

  useEffect(() => {
    if(!props.angle) return;
    
    const frequency = calculateFrequencyFromAngle(props.angle);
    
    setFrequency(frequency);
  }, [props.angle]);

  return (
    <div className="infobox">
      {showVisibleSpectrumWheel ?
        <Note frequency={frequency} />
        :
        <Interval
          harmonicLimit={harmonicLimit}
          ratio={calculateColorsRatio(...props.colors)}
        />
      }
    </div>
  )
}
