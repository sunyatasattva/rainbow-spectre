import { MutableRefObject, useCallback, useState } from "react";
import { bus } from "../app";
import useInteractionEventListener,
  { isTouchEvent } from "./useInteractionEventListener";
import { radToDeg } from "../lib/math";

export default function useMouseRotation(
  defaultAngle: number,
  element: MutableRefObject<HTMLElement>
) {
  const [angle, setAngle] = useState(defaultAngle);

  const handleRotation = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!element.current)
        return;
      
      e.preventDefault();
      
      let clientX, clientY;

      if( isTouchEvent(e) ) {
        ({ clientX, clientY } = e.touches[0]);
      } else {
        ({ clientX, clientY } = e);
      }

      const boundingRect = element.current.getBoundingClientRect();

      const delta = {
        x: clientX - Math.round(boundingRect.left + boundingRect.width / 2),
        y: (clientY - Math.round(boundingRect.top + boundingRect.height / 2)) * -1,
      };

      const radianAngle = (Math.atan2(delta.y, delta.x) - Math.PI / 2) * -1;
      const newVal = radToDeg(radianAngle);

      setAngle((oldVal) => {
        bus.emit("angleChange", { newVal, oldVal });

        return newVal;
      });
    },
    [element]
  );

  function mouseDown() {
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchend", mouseUp);
    document.addEventListener("mousemove", handleRotation);
    document.addEventListener("touchmove", handleRotation)
  }

  function mouseUp() {
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("touchend", mouseUp);
    document.removeEventListener("mousemove", handleRotation);
    document.removeEventListener("touchmove", handleRotation);

    bus.emit("angleCommit", angle);
  }

  useInteractionEventListener(element, "mousedown", mouseDown);
  useInteractionEventListener(element, "touchstart", mouseDown);

  return [angle, setAngle] as const;
}
