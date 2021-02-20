import { useEffect, useState } from "react";

export default function useBreakpoint(breakpoint: number) {
  const [isBreakpoint, setIsBreakpoint] = useState(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    function handleWindowSizeChange() {
      setIsBreakpoint(
        window.innerWidth <= breakpoint
      );
    }

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [breakpoint]);

  return isBreakpoint;
}