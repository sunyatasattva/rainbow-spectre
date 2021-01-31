import { MutableRefObject, useCallback, useEffect, useRef } from "react";

type MouseEvents = "mousedown" | "mousemove" | "mouseup";
type TouchEvents = "touchstart" | "touchmove" | "touchend";
type AllowedEvents = MouseEvents | TouchEvents;
type EventMap = Record<MouseEvents, MouseEvent>
  & Record<TouchEvents, TouchEvent>;
type EventHandler<E extends AllowedEvents> = (e: EventMap[E]) => any;

export function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
  return !!((e as TouchEvent).touches);
}

export default function useInteractionEventListener<T extends AllowedEvents>(
  el: MutableRefObject<HTMLElement>,
  event: T,
  cb: EventHandler<T>) {
  const cbRef = useRef<typeof cb>();

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const callback = useCallback(
    (e: EventMap[T]) => cbRef.current && cbRef.current(e),
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
