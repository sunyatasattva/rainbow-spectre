import "../styles/handle.scss";
import React, { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { bus } from "../app";
import { useOptions } from "../hooks/useGlobalState";
import useMouseRotation from "../hooks/useMouseRotation";

interface Props {
  className?: string;
  initialAngle: number;
  isReferenceHandle?: boolean;
  onChange: (value: number) => any;
  onClick?: (value: number) => any;
  parentSize: number; // Perhaps this should be calculated instead?
}

export default function Handle(props: Props) {
  const [{ lockRatio }] = useOptions();
  const container = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useMouseRotation(
    props.initialAngle,
    container as MutableRefObject<HTMLElement>
  );
  const angleRef = useRef<number>();
  const lockRef = useRef<boolean>();
  const onChangeRef = useRef(props.onChange);

  angleRef.current = angle;
  lockRef.current = lockRatio;

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

  return (
    <div
      className={`handle-container ${props.className}`}
      ref={container}
      style={{
        width: `${props.parentSize}px`,
        height: `${props.parentSize}px`,
        transform: `rotate(${angle}deg)`,
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
