import "../styles/handle.scss";
import React, { CSSProperties, MutableRefObject, useCallback, useEffect, useRef } from "react";
import { bus } from "../app";
import useMouseRotation from "../hooks/useMouseRotation";
import { useOptions } from "hooks/useGlobalState";
import { HSLColor } from "lib/types";
import Color from "color";
import { calculateWavelengthFromAngle, wavelengthToRGBA } from "lib/spectrum-calculator";
import usePrevious from "hooks/usePrevious";

interface Props {
  angle: number;
  className?: string;
  handleColor?: HSLColor;
  isReferenceHandle?: boolean;
  ignoreLock?: boolean;
  onChange: (value: number) => any;
  onClick?: (value: number) => any;
  parentSize: number; // Perhaps this should be calculated instead?
  style?: CSSProperties;
}

export default function Handle(props: Props) {
  const { handleColor, onChange } = props;
  const [{ lockRatio }] = useOptions();
  const ignoreLock = props.ignoreLock || !lockRatio;
  const container = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useMouseRotation(
    props.angle,
    container as MutableRefObject<HTMLElement>
  );
  const angleRef = useRef<number>();
  const lockRef = useRef<boolean>(false);

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

  // This responds to changes of angle changes of other handles
  // in the application.
  useEffect(
    () => { bus.on("angleChange", respondToChanges) },
    [respondToChanges]
  );

  const previousAngles = usePrevious({ prop: props.angle, angle });

  // When the angle is changed from above, use that. This is needed
  // for when the angle is set through, e.g. the infobox changing
  // the ratio.
  useEffect(() => {
    if(previousAngles?.angle !== angle) {
      setAngle(angle);
      onChange?.(angle);
    }
    else setAngle(props.angle);
  }, [angle, previousAngles, props.angle, onChange, setAngle]);

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
