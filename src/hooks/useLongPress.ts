import { useCallback, useRef, useState } from "react";
import { isTouchEvent } from "./useInteractionEventListener";
  
function preventDefault(event: Event) {
  if ( !isTouchEvent(event) ) return;
  
  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

type LongPressCallback = () => void;

interface PressHandlers<T> {
  onLongPress: (e: React.MouseEvent<T> | React.TouchEvent<T>) => 
    LongPressCallback | void,
  onClick?: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void,
}

interface Options {
  delay?: number,
  shouldPreventDefault?: boolean
}

export default function useLongPress<T>(
  { onLongPress, onClick }: PressHandlers<T>,
  { delay = 300, shouldPreventDefault = true }
  : Options
  = {}
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const longPressCallback = useRef<LongPressCallback | void>();
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (e: React.MouseEvent<T> | React.TouchEvent<T>) => {
      e.persist();
      const clonedEvent = { ...e };
      
      if (shouldPreventDefault && e.target) {
        e.target.addEventListener(
          "touchend",
          preventDefault,
          { passive: false }
        );
        target.current = e.target;
      }

      timeout.current = setTimeout(() => {
        longPressCallback.current = onLongPress(clonedEvent);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback((
      e: React.MouseEvent<T> | React.TouchEvent<T>,
      shouldTriggerClick = true
    ) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick?.(e);

      setLongPressTriggered(false);

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e: React.MouseEvent<T>) => start(e),
    onTouchStart: (e: React.TouchEvent<T>) => start(e),
    onMouseUp: (e: React.MouseEvent<T>) => {
      if(longPressTriggered && longPressCallback.current)
        longPressCallback.current();

      clear(e);
    },
    onMouseLeave: (e: React.MouseEvent<T>) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent<T>) => {
      if(longPressTriggered && longPressCallback.current)
        longPressCallback.current();

      clear(e)
    }
  };
};
