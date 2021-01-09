import { on } from "process";
import { useEffect, useState } from "react";

export function useKeyPress(key: string) {
  const [isKeyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if(key === e.key) setKeyPressed(true);
    }
  
    function onKeyUp(e: KeyboardEvent) {
      if(key === e.key) setKeyPressed(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    }
  }, [key]);

  return isKeyPressed;
}
