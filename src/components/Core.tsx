import React, { useEffect, useState } from "react";
import "../styles/core.scss";
import { calculateColorsRatio, playColorsInterval } from "lib/utils";
import { useOptions } from "../hooks/useGlobalState";
import { useKeyPress } from "hooks/useKeyPress";
import Sound from "lib/tones";

interface CoreProps {
  baseFrequency?: number;
  colors: [string, string];
}


export default function Core(props: CoreProps) {
  const [leftColor, rightColor] = props.colors;
  const [shouldSwitch, setShouldSwitch] = useState(false);
  const [{ baseFrequency }] = useOptions();
  const isAltPressed = useKeyPress("Alt");

  function calculateColorFrequency() {
    const ratio = calculateColorsRatio(leftColor, rightColor);

    return baseFrequency * ratio;
  }

  function playInterval() {
    playColorsInterval(leftColor, rightColor, baseFrequency);
  }

  /**
   * This trick is required because SVG doesn't support `z-index` property
   * and so when the scale animation would kick in, the overlap was wrong.
   */
  useEffect(() => {
    const core = document.getElementById("core");

    if(!core?.firstElementChild) return;

    core.appendChild(core.firstElementChild);
  }, [shouldSwitch]);

  return (
    <div className="core-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="core"
        id="core"
        viewBox="0 0 466 466"

        onClick={() => !isAltPressed && playInterval()}
      >
        <g
          className="fish left-fish"
          id="left-fish"
          onClick={
            () => isAltPressed && Sound.play(baseFrequency, { volume: 0.33 })
          }
        >
          <path
            d="M122.1,343.7c0-61.1,49.6-110.7,110.7-110.7s110.7-49.6,110.7-110.7c0-60.1-48.1-109.1-107.8-110.6c0.6,0,1.2,0,1.8,0
            c-1.1,0-2.3-0.1-3.5-0.1C111.8,11.7,12.7,110.8,12.7,233c0,118.9,93.9,216,211.6,221.1C167.1,449.7,122.1,401.9,122.1,343.7z"
            fill={leftColor}
          />
          <g className="frequency-container">
            <text>{baseFrequency} Hz</text>
          </g>
        </g>
        <g
          className="fish right-fish"
          onClick={
            () => isAltPressed && Sound.play(
              calculateColorFrequency(),
              { volume: 0.33 }
            )
          }
          onMouseEnter={() => setShouldSwitch(true)}
          onMouseLeave={() => shouldSwitch && setShouldSwitch(false)}
        >
          <path
            d="M232.8,11.7c122.2,0,221.3,99.1,221.3,221.4S355,454.4,232.8,454.4c-61.1,0-110.7-49.6-110.7-110.7
            S171.7,233,232.8,233s110.7-49.6,110.7-110.7S293.9,11.7,232.8,11.7"
            fill={rightColor}
          />
          <g className="frequency-container">
            <text>{Math.round(
              baseFrequency * (1 / calculateColorsRatio(leftColor, rightColor))
            )} Hz</text>
          </g>
        </g>
      </svg>
    </div>

  )
}