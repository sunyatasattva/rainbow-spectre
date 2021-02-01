import "../styles/handle.scss";
import React, { CSSProperties, MutableRefObject, useCallback, useEffect, useRef } from "react";
import { bus } from "../app";
import useMouseRotation from "../hooks/useMouseRotation";

interface Props {
  className?: string;
  initialAngle: number;
  isReferenceHandle?: boolean;
  ignoreLock?: boolean;
  onChange: (value: number) => any;
  onClick?: (value: number) => any;
  parentSize: number; // Perhaps this should be calculated instead?
  style?: CSSProperties;
}

export default function Handle(props: Props) {
  const { ignoreLock } = props;
  const container = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useMouseRotation(
    props.initialAngle,
    container as MutableRefObject<HTMLElement>
  );
  const angleRef = useRef<number>();
  const onChangeRef = useRef(props.onChange);

  angleRef.current = angle;

  const respondToChanges = useCallback(
    ({ newVal, oldVal }: { newVal: number, oldVal: number }) => {
      if(!ignoreLock && oldVal !== angleRef.current) {
        const delta = newVal - oldVal;

        setAngle(angleRef.current! + delta);
      }
    },
    [ignoreLock, setAngle]
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
          backgroundColor: `hsl(${angle}deg, 100%, 50%)`
        }}
      >
      </span>
    </div>
  );
}
