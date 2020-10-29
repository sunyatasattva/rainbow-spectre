import { MutableRefObject, useCallback, useState } from "react";
import { bus } from "../app";
import useMouseEventListener from "./useMouseEventListener";
import { radToDeg } from "../lib/utils";

export default function useMouseRotation(
  defaultAngle: number,
  element: MutableRefObject<HTMLElement>
) {
  const [angle, setAngle] = useState(defaultAngle);

  const handleRotation = useCallback(
    (e: MouseEvent) => {
      if (!element.current)
        return;

      const boundingRect = element.current.getBoundingClientRect();

      const delta = {
        x: e.clientX - Math.round(boundingRect.left + boundingRect.width / 2),
        y: (e.clientY - Math.round(boundingRect.top + boundingRect.height / 2)) * -1,
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
    document.addEventListener("mousemove", handleRotation);
  }

  function mouseUp() {
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("mousemove", handleRotation);

    bus.emit("angleCommit", angle);
  }

  useMouseEventListener(element, "mousedown", mouseDown);

  return [angle, setAngle] as const;
}
