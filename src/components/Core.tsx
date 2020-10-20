import React from "react";
import hexToHsl from "hex-to-hsl";
import Sound from "../lib/tones";
import "../styles/Core.css";

interface CoreProps {
  baseFrequency?: number;
  colors: [string, string];
}

export default function Core(props: CoreProps) {
  const [leftColor, rightColor] = props.colors;
  const f = props.baseFrequency || 440;

  function calculateColorsRatio() {
    const [aHue] = hexToHsl(leftColor);
    const [bHue] = hexToHsl(rightColor);

    return (aHue + 360) / (bHue + 360);
  }

  function playInterval() {
    const ratio = calculateColorsRatio();
  
    Sound.play(f, { volume: 0.33 });
    Sound.play(f * ratio, { volume: 0.33 });
  }

  return (
    <div className="core-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="core"
        viewBox="0 0 466 466"

        onClick={() => playInterval()}
      >
        <circle
          className="core-circle"
          cx="233"
          cy="5233"
          fill="none"
          r="227.2"
          stroke="#000"
          strokeMiterlimit="10"
          strokeWidth="4"
        />
        <g className="fish left-fish">
          <path
            d="M234,454.3c-122.2,0-221.3-99.1-221.3-221.3S111.8,11.7,234,11.7c61.1,
            0,110.7,49.6,110.7,110.7 S295.1,233,234,233s-110.7,49.6-110.7,
            110.7S172.9,454.3,234,454.3"
            fill={leftColor}
          />
          <g className="frequency-container">
            <text>{f} Hz</text>
          </g>
        </g>
        <g className="fish right-fish">
          <path
            d="M232.8,11.7c122.2,0,221.3,99.1,221.3,221.4s-99.1,221.3-221.3,
            221.3c-61.1,0-110.7-49.6-110.7-110.7S171.7,233,232.8,233
            s110.7-49.6,110.7-110.7S293.9,11.7,232.8,11.7"
            fill={rightColor}
          />
          <g className="frequency-container">
            <text>{Math.round(f * calculateColorsRatio())} Hz</text>
          </g>
        </g>
      </svg>
    </div>

  )
}