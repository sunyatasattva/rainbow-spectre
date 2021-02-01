import "../styles/color-components-wrapper.scss";
import React from "react";
import hexToHsl from "hex-to-hsl";
import Handle from "./Handle";
import { useColors } from "hooks/useGlobalState";
import { ColorComponent, HSLColor } from "lib/types";
import { hslToString } from "lib/utils";

interface Props {
  children: JSX.Element;
  selectedColor: 0 | 1;
  /**
   * Fires when one of the components circle has changed
   * 
   * @param k  Either `0 | 1 | 2` depending on `h | s | l`
   * @param v  The new value for that component
   */
  onChange?(k: 0 | 1 | 2, v: number): any;
}

export default function ColorComponentsWrapper(props: Props) {
  const { onChange, selectedColor } = props;
  const [colors] = useColors();
  const [h, s, l] = hexToHsl(colors[selectedColor]);
  const className = selectedColor === 0 ? "reference-handle" : "";

  return (
    <div className="color-components-wrapper">
      <svg className="components-rings" viewBox="0 0 35 35">
        <g className="ring saturation-ring">
          <circle
            className="ring-track"
            cx="50%"
            cy="50%"
            stroke={`hsl(${h}deg, ${s}%, 20%)`}
            strokeWidth="5" 
            r="15"
          />
          <circle
            className="ring-train"
            cx="50%"
            cy="50%"
            stroke={`hsl(${h}deg, ${s}%, 50%)`}
            strokeDasharray="94.2"
            strokeDashoffset={94.2 * (1 - s/100)}
            strokeWidth="5" 
            r="15"
          />
        </g>
        <g className="ring lightness-ring">
          <circle
            cx="50%"
            cy="50%"
            stroke={`hsl(${h}deg, ${s}%, 20%)`}
            strokeWidth="2" 
            r="15"
          />
          <circle
            cx="50%"
            cy="50%"
            stroke={`hsl(${h}deg, 50%, ${l}%)`}
            strokeDasharray="94.2"
            strokeDashoffset={94.2 * (1 - l/100)}
            strokeWidth="2" 
            r="15"
          />
        </g>
      </svg>
      <Handle
        className={`saturation-handle ${className}`}
        initialAngle={360 * (s / 100)}
        key={`${selectedColor}-s`}
        onChange={(v) => onChange?.(1, v)}
        parentSize={360}
      />
      <Handle
        className={`lightness-handle ${className}`}
        key={`${selectedColor}-l`}
        initialAngle={360 * (l / 100)}
        onChange={(v) => onChange?.(2, v)}
        parentSize={330}
      />
      {props.children}
    </div>
  );
}
