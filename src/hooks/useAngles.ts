import { bus } from "app";
import Sound from "lib/tones";
import { calculateFrequencyFromAngle, playAngleInterval } from "lib/utils";
import { useEffect } from "react";
import { Options } from "./useGlobalState";

function playFrequencyFromAngle(angle: number) {
  return Sound.play(
    calculateFrequencyFromAngle(angle),
    { volume: 0.33 }
  );
}

export default function useAngles(
  angles: number[],
  options: Options,
  setIsAutoplaying: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleHueChange() {
      const [a, b] = angles;
      
      if(options.autoplay) {
        let sound: Promise<Sound>;
        setIsAutoplaying(true);
        if(options.mode === "interval")
          sound = playAngleInterval(a, b, options.baseFrequency);
        else
          sound = playFrequencyFromAngle(angles[0]);
        
        sound.then( () => setIsAutoplaying(false) );
      }
    }

    bus.on("angleCommit", handleHueChange);

    return () => {
      bus.off("angleCommit", handleHueChange);
    }
  }, [angles, options, setIsAutoplaying]);

  useEffect(() => {
    let sound: Sound;

    function coreClick(longPress?: boolean) {
      if(!longPress)
        playFrequencyFromAngle(angles[0]);
      else {
        sound = new Sound(
          calculateFrequencyFromAngle(angles[0]),
          { sustain: -1, volume: 0.33 }
        );

        sound.play();
      }
    }

    function corePressUp() {
      sound.fadeOut();
    }

    bus.on("coreClick", coreClick);
    bus.on("corePressUp", corePressUp);
    
    return () => {
      bus.off("coreClick", coreClick);
      bus.off("corePressUp", corePressUp);
    }
  }, [angles]);
}
