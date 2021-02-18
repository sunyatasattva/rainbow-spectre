import React, { useEffect, useState } from "react";
import { AllowedHarmonicLimit, Ratio } from "lib/types";
import DifferenceBar from "./DifferenceBar";
import intervals, { equallyTemperedIntervals } from "lib/intervals";
import { fractionMax } from "lib/math";
import Sound from "lib/tones";
import { translate as t } from "lib/i18n";
import dictionary from "i18n";
import IntervalInput from "./IntervalInput";

interface Props {
  harmonicLimit: AllowedHarmonicLimit;
  onChangeRatio: (newRatio: Ratio) => void;
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

function updateInteval(ratio: number, harmonicLimit: AllowedHarmonicLimit)
: IntervalInfo {
  const ratioInCents = Sound.ratioToCents(ratio);
  const interval = harmonicLimit !== "None" ?
    Sound.getClosestIntervalTo(ratio, harmonicLimit)
    : fractionMax(ratio, 100);
  const intervalInCents = Sound.ratioToCents(interval);

  return {
    actualCents: ratioInCents,
    idealCents: intervalInCents,
    name: getIntervalName(interval),
    ratio: interval
  }
}

export default function Interval(props: Props) {
  const { harmonicLimit, onChangeRatio, ratio } = props;
  const [isEditing, setIsEditing] = useState(false);
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
    const newInterval = updateInteval(ratio, harmonicLimit);

    setInterval(newInterval);
  }, [harmonicLimit, ratio])

  return (
    <>
      {currentRatioLimit >= 3 ?
        <div className={badgeClassName()}>
          {harmonicLimit === "12-TET" ?
            harmonicLimit
            : t("OPTION_ROUND_O_LIMIT", { n: currentRatioLimit })
          }
        </div>
        : null
      }
      <div className="interval-container">
        <div className="interval" onClick={() => setIsEditing(true)}>
          {isEditing ?
            <IntervalInput
              defaultValue={interval.ratio.join("/")}
              onChange={(e) => {
                const [num, den] = (e.target as HTMLInputElement).value
                  .split(/\/|:/);
                onChangeRatio([+num, +den]);
                setIsEditing(false);
              }}
            />
            :
            <>
              <sup>{interval.ratio[0]}</sup>
              <span>/</span>
              <sub>{interval.ratio[1]}</sub>
            </>
          }
        </div>
        <div className={intervalNameClassName()}>
          {t(
            interval.name as keyof typeof dictionary[keyof typeof dictionary]
          )}
        </div>
      </div>
      {harmonicLimit !== "None" ?
        <DifferenceBar value={interval.actualCents - interval.idealCents} />
        : null
      }
    </>
  );
}