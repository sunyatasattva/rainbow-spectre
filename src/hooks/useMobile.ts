import { useEffect, useState } from "react";

export default function useMobile(breakpoint: number) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    function handleWindowSizeChange() {
      setIsMobile(
        window.innerWidth <= breakpoint
      );
    }

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [breakpoint]);

  return isMobile;
}