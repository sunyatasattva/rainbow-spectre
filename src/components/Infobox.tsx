import React, { useEffect, useState } from "react";
import "../styles/infobox.scss";
import Interval from "./Interval";
import Note from "./Note";
import { useOptions } from "hooks/useGlobalState";
import { calculateAngleRatio, calculateFrequencyFromAngle } from "lib/utils";
interface Props {
  angles: number[];
}

export default function Infobox(props: Props) {
  const [frequencies, setFrequencies] = useState([440]);
  const [{ harmonicLimit }] = useOptions();

  useEffect(() => {
    const newFrequencies = props.angles.map(calculateFrequencyFromAngle);

    setFrequencies(newFrequencies);
  }, [props.angles]);

  return (
    <div className="infobox">
      {frequencies.length < 2 ?
        <Note frequency={frequencies[0]} />
        :
        <Interval
          harmonicLimit={harmonicLimit}
          ratio={calculateAngleRatio(props.angles[0], props.angles[1])}
        />
      }
    </div>
  )
}
