import { MutableRefObject, useCallback, useEffect, useRef } from "react";

type MouseEventListener = (e: MouseEvent) => any;
type MouseEvents = "mousedown" | "mousemove" | "mouseup";

export default function useMouseEventListener(
  el: MutableRefObject<HTMLElement>,
  event: MouseEvents,
  cb: MouseEventListener) {
  const cbRef = useRef<MouseEventListener>();

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const callback = useCallback(
    (e: MouseEvent) => cbRef.current && cbRef.current(e),
    [cbRef]
  );

  useEffect(() => {
    const current = el.current;
    if (!current)
      return;

    current.addEventListener(event, callback);
    return () => {
      current.removeEventListener(event, callback);
    };
  }, [callback, el, event]);
};
