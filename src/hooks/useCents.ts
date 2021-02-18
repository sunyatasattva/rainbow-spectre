import { useEffect } from "react";
import Sound from "lib/tones";
import { calculateAngleFromRatio, calculateAngleRatio } from "lib/utils";
import { bus } from "app";
import { HSLColor } from "lib/types";

export default function useCents(
  useAngles: [
    number[],
    React.Dispatch<React.SetStateAction<number[]>>
  ],
  setColors: React.Dispatch<React.SetStateAction<HSLColor[]>>
) {
  const [angles, setAngles] = useAngles;

  useEffect(() => {
    function handleCentChange(val: number, commit?: boolean) {
      if(commit) {
        setColors((colors) => {
          const [/** */, b] = angles;
          const [aColor, bColor] = colors;
          
          return [
            aColor,
            [b, bColor[1], bColor[2]]
          ]
        });
      } else {
        setAngles((angles) => {
          const [a, b] = angles;
          const ratio = calculateAngleRatio(a, b);
          const cents = Sound.ratioToCents(ratio) + val;
          const newAngles = [
            a,
            a + calculateAngleFromRatio( Sound.centsToRatio(cents) )
          ];
          
          return newAngles;
        });
      }
    }

    bus.on("centChange", handleCentChange);
    return () => {
      bus.off("centChange", handleCentChange);
    }
  }, [angles, setAngles, setColors]);
}
