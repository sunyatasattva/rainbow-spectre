import { useEffect, useState } from "react";

export default function useHash() {
  const [hash, setHash] = useState(document.location.hash);

  useEffect(() => {
    function onHashChange() {
      setHash(document.location.hash);
    }

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    }
  }, []);

  return hash.slice(1);
}
