import React, { useEffect, useState } from "react";
import "../styles/core.scss";
import { calculateColorsRatio, hslToString, playAngleInterval } from "lib/utils";
import { useOptions } from "../hooks/useGlobalState";
import { useKeyPress } from "hooks/useKeyPress";
import Sound from "lib/tones";
import { HSLColor } from "lib/types";
import { bus } from "app";
import useLongPress from "hooks/useLongPress";
import { isTouchEvent } from "hooks/useInteractionEventListener";

interface CoreProps {
  baseFrequency?: number;
  colors: HSLColor[];
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
    if(!rightColor) return;

    const [aHue] = leftColor;
    const [bHue] = rightColor;

    playAngleInterval(aHue, bHue, baseFrequency);
  }

  const onLongPressFish = useLongPress<SVGGElement>({
    onLongPress(e) {
      if( isTouchEvent(e.nativeEvent) ) {
        let sound: Sound;
        const currentTarget = e.currentTarget;
        currentTarget.classList.add("is-pressed");

        if(currentTarget.id === "left-fish")
          sound = new Sound(baseFrequency, { sustain: -1, volume: 0.33 });
        else
          sound = new Sound(
            calculateColorFrequency(),
            { sustain: -1, volume: 0.33 }
          );

        sound.play();
        
        return () => {
          currentTarget.classList.remove("is-pressed");
          sound.fadeOut();
        };
      }
    }},
    { shouldPreventDefault: false }
  );

  const onLongPressCore = useLongPress<SVGCircleElement>({
    onLongPress() {
      bus.emit("coreClick", true);

      return () => bus.emit("corePressUp");
    }},
    { shouldPreventDefault: false }
  );

  /**
   * This trick is required because SVG doesn't support `z-index` property
   * and so when the scale animation would kick in, the overlap was wrong.
   */
  useEffect(() => {
    return () => {
      const core = document.getElementById("core");

      if(!core?.firstElementChild) return;

      core.appendChild(core.firstElementChild);
    }
  }, [shouldSwitch]);

  return (
    <div className="core-container">
      {props.colors.length < 2 ?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="core"
          viewBox="0 0 466 466"
        >
          <circle
            {...onLongPressCore}
            cx="233"
            cy="233"
            fill={hslToString(leftColor)}
            onClick={() => bus.emit("coreClick")}
            r="220"
          />
        </svg>
        :
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
            {...onLongPressFish}
            onClick={
              () => isAltPressed && Sound.play(baseFrequency, { volume: 0.33 })
            }
            onMouseEnter={() => setShouldSwitch(true)}
            onMouseLeave={() => shouldSwitch && setShouldSwitch(false)}
          >
            <path
              d="M122.1,343.7c0-61.1,49.6-110.7,110.7-110.7s110.7-49.6,110.7-110.7c0-60.1-48.1-109.1-107.8-110.6c0.6,0,1.2,0,1.8,0
              c-1.1,0-2.3-0.1-3.5-0.1C111.8,11.7,12.7,110.8,12.7,233c0,118.9,93.9,216,211.6,221.1C167.1,449.7,122.1,401.9,122.1,343.7z"
              fill={hslToString(leftColor)}
            />
            <g className="frequency-container">
              <text>{baseFrequency} Hz</text>
            </g>
          </g>
          <g
            className="fish right-fish"
            id="right-fish"
            {...onLongPressFish}
            onClick={
              () => isAltPressed && Sound.play(
                calculateColorFrequency(),
                { volume: 0.33 }
              )
            }
          >
            <path
              d="M232.8,11.7c122.2,0,221.3,99.1,221.3,221.4S355,454.4,232.8,454.4c-61.1,0-110.7-49.6-110.7-110.7
              S171.7,233,232.8,233s110.7-49.6,110.7-110.7S293.9,11.7,232.8,11.7"
              fill={hslToString(rightColor)}
            />
            <g className="frequency-container">
              <text>{Math.round(
                baseFrequency * (1 / calculateColorsRatio(leftColor, rightColor))
              )} Hz</text>
            </g>
          </g>
        </svg>
      }
    </div>

  )
}