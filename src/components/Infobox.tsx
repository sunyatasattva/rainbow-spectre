import "../styles/infobox.scss";
import { useOptions } from "hooks/useGlobalState";
import intervals from "lib/intervals";
import Sound from "lib/tones";
import { calculateColorsRatio, fractionMax } from "lib/utils";
import React, { useEffect, useState } from "react";
import DifferenceBar from "./DifferenceBar";
import { Ratio } from "lib/types";

interface Props {
  colors: [string, string];
}

function getIntervalName(ratio: [number, number]) {
  const [n, d] = ratio;
  const interval = intervals[`${n}/${d}`]
    || intervals[`${d}/${n}`];

  return interval ? interval.name : "Unknown interval";
}

export default function Infobox(props: Props) {
  const [intervalRatio, setIntervalRatio] = useState<Ratio>([0, 0]);
  const [intervalName, setIntervalName] = useState("");
  const [intervalsInCents, setIntervalsInCents] = useState([0, 0]);
  const [{ harmonicLimit }] = useOptions();
  const currentRatioLimit = Sound.harmonicLimitOf(intervalRatio);

  function className() {
    const isUnknownInterval = intervalName === "Unknown interval";

    return `interval-name ${isUnknownInterval ? "unknown-interval" : ""}`;
  }

  useEffect(
    () => {
      const [a, b] = props.colors;
      const ratio = calculateColorsRatio(a, b);
      const ratioInCents = Sound.ratioToCents(ratio);
      const interval = harmonicLimit ?
        Sound.getClosestIntervalTo( calculateColorsRatio(a, b), harmonicLimit )
        : fractionMax(ratio, 1000);
      const intervalInCents = Sound.ratioToCents(interval);

      setIntervalRatio(interval);
      setIntervalName(getIntervalName(interval));
      setIntervalsInCents([ratioInCents, intervalInCents]);
    },
    [props.colors, harmonicLimit]
  );

  return (
    <div className="infobox">
      {!harmonicLimit || harmonicLimit > 3 ?
        <div className={`badge limit-${currentRatioLimit}`}>
          {currentRatioLimit}-limit
        </div>
        : null
      }
      <div className="interval">
        <sup>{intervalRatio[0]}</sup>
        <span>/</span>
        <sub>{intervalRatio[1]}</sub>
      </div>
      <div
        className={className()}
      >
        {intervalName}
      </div>
      <DifferenceBar value={intervalsInCents[0] - intervalsInCents[1]} />
    </div>
  )
}
