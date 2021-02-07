import React, { useEffect, useState } from "react";
import { AllowedHarmonicLimit, Ratio } from "lib/types";
import DifferenceBar from "./DifferenceBar";
import intervals, { equallyTemperedIntervals } from "lib/intervals";
import { fractionMax } from "lib/math";
import Sound from "lib/tones";

interface Props {
  harmonicLimit: AllowedHarmonicLimit;
  ratio: number;
}

interface IntervalInfo {
  actualCents: number;
  idealCents: number;
  name: string;
  ratio: Ratio;
}

function getIntervalName(ratio: [number, number]) {
  const [n, d] = ratio;
  const interval = intervals[`${n}/${d}`]
    || intervals[`${d}/${n}`]
    || equallyTemperedIntervals[Sound.ratioToCents(ratio)];

  return interval ? interval.name : "Unknown interval";
}

export default function Interval(props: Props) {
  const { harmonicLimit, ratio } = props;
  const [interval, setInterval] = useState<IntervalInfo>({
    actualCents: 0,
    idealCents: 0,
    name: "Unison",
    ratio: [1, 1]
  });

  const currentRatioLimit = Sound.harmonicLimitOf(interval.ratio);

  function badgeClassName() {
    const limitClass = `limit-${currentRatioLimit}`;
    const equalTemperament = harmonicLimit === "12-TET" ? "is-12-tet" : "";

    return `badge ${limitClass} ${equalTemperament}`;
  }

  function intervalNameClassName() {
    const isUnknownInterval = interval.name === "Unknown interval";

    return `interval-name ${isUnknownInterval ? "unknown-interval" : ""}`;
  }

  useEffect(() => {
    const ratioInCents = Sound.ratioToCents(ratio);
    const interval = harmonicLimit !== "None" ?
      Sound.getClosestIntervalTo(ratio, harmonicLimit)
      : fractionMax(ratio, 100);
    const intervalInCents = Sound.ratioToCents(interval);

    setInterval({
      actualCents: ratioInCents,
      idealCents: intervalInCents,
      name: getIntervalName(interval),
      ratio: interval
    })
  }, [harmonicLimit, ratio])

  return (
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
          <sup>{interval.ratio[0]}</sup>
          <span>/</span>
          <sub>{interval.ratio[1]}</sub>
        </div>
        <div className={intervalNameClassName()}>
          {interval.name}
        </div>
      </div>
      {harmonicLimit !== "None" ?
        <DifferenceBar value={interval.actualCents - interval.idealCents} />
        : null
      }
    </>
  );
}