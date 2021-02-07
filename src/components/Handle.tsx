import "../styles/handle.scss";
import React, { CSSProperties, MutableRefObject, useCallback, useEffect, useRef } from "react";
import { bus } from "../app";
import useMouseRotation from "../hooks/useMouseRotation";
import { useOptions } from "hooks/useGlobalState";
import { HSLColor } from "lib/types";
import Color from "color";
import { calculateWavelengthFromAngle, wavelengthToRGBA } from "lib/spectrum-calculator";

interface Props {
  className?: string;
  handleColor?: HSLColor;
  initialAngle: number;
  isReferenceHandle?: boolean;
  ignoreLock?: boolean;
  onChange: (value: number) => any;
  onClick?: (value: number) => any;
  parentSize: number; // Perhaps this should be calculated instead?
  style?: CSSProperties;
}

export default function Handle(props: Props) {
  const { handleColor } = props;
  const [{ lockRatio }] = useOptions();
  const ignoreLock = props.ignoreLock || !lockRatio;
  const container = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useMouseRotation(
    props.initialAngle,
    container as MutableRefObject<HTMLElement>
  );
  const angleRef = useRef<number>();
  const lockRef = useRef<boolean>(false);
  const onChangeRef = useRef(props.onChange);

  angleRef.current = angle;
  lockRef.current = !ignoreLock;

  const respondToChanges = useCallback(
    ({ newVal, oldVal }: { newVal: number, oldVal: number }) => {
      if(lockRef.current && oldVal !== angleRef.current) {
        const delta = newVal - oldVal;

        setAngle(angleRef.current! + delta);
      }
    },
    [setAngle]
  );

  useEffect(
    () => {
      onChangeRef.current(angle);
    },
    [angle]
  );

  useEffect(
    () => { bus.on("angleChange", respondToChanges) },
    [respondToChanges]
  );

  const handleBackgroundHue = handleColor ? handleColor[0] : angle;
  const alpha = handleColor ? wavelengthToRGBA(
    calculateWavelengthFromAngle(angle)
  )[3] : 1;
  const handleBackgroundColor = Color.hsl([handleBackgroundHue, 100, 50])
    .alpha(alpha)
    .string();

  return (
    <div
      className={`handle-container ${props.className}`}
      ref={container}
      style={{
        width: `${props.parentSize}px`,
        height: `${props.parentSize}px`,
        transform: `rotate(${angle}deg)`,
        ...props.style
      }}
    >
      <span
        className="handle"
        onMouseDown={() => props.onClick?.(angle)}
        style={{
          backgroundColor: handleBackgroundColor
        }}
      >
      </span>
    </div>
  );
}
