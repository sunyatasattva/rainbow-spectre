import frac from "frac";
import intervals from "lib/intervals";
import { calculateColorsRatio } from "lib/utils";
import React, { useEffect, useState } from "react";
import "../styles/infobox.scss";

interface Props {
  colors: [string, string];
}

function getIntervalName(ratio: [number, number, number]) {
  const [/* */, n, d] = ratio;
  const interval = intervals[`${n}/${d}`]
    || intervals[`${d}/${n}`];

  return interval ? interval.name : "Unknown interval";
}

export default function Infobox(props: Props) {
  const [intervalRatio, setIntervalRatio] = useState([0, 0, 0]);
  const [intervalName, setIntervalName] = useState("");

  function className() {
    const isUnknownInterval = intervalName === "Unknown interval";

    return `interval-name ${isUnknownInterval ? "unknown-interval" : ""}`;
  }

  useEffect(
    () => {
      const [a, b] = props.colors;
      const ratio = frac( calculateColorsRatio(a, b), 999 );

      setIntervalRatio(ratio);
      setIntervalName(getIntervalName(ratio));
    },
    [props.colors]
  );

  return (
    <div className="infobox">
      <div className="interval">
        <sup>{intervalRatio[1]}</sup>
        <span>/</span>
        <sub>{intervalRatio[2]}</sub>
      </div>
      <div
        className={className()}
      >
        {intervalName}
      </div>
    </div>
  )
}
