import React, { useEffect, useRef, useState } from "react";
import "./styles/app.scss";
import logo from "./images/logo.svg";
import { defaultColors, useColors } from "hooks/useGlobalState";
import ColorPicker from "./components/ColorPicker"
import Core from "./components/Core";
import Infobox from "./components/Infobox";
import OptionsBox from "./components/OptionsBox";
import { useOptions } from "./hooks/useGlobalState";
import EventBus from "./lib/EventBus";
import { useKeyPress } from "hooks/useKeyPress";
import ColorComponentsWrapper from "components/ColorComponentsWrapper";
import { degToPercent } from "lib/math";
import { calculateFrequencyFromAngle, playAngleInterval } from "lib/utils";
import Sound from "lib/tones";
import { calculateWavelengthFromAngle, wavelengthToRGB } from "lib/spectrum-calculator";
import Color from "color";
import { HSLColor } from "lib/types";

export const bus = new EventBus<{
  angleChange: ({ oldVal, newVal }: { oldVal: number, newVal: number }) => void;
  angleCommit: (deg: number) => void;
  coreClick: () => void;
}>();

function hslFromAngle(angle: number) {
  const wl = calculateWavelengthFromAngle(angle);
  const color = Color.rgb(
    wavelengthToRGB(wl)
    );

  return color.hsl().array() as HSLColor;
}

function playFrequencyFromAngle(angle: number) {
  return Sound.play(
    calculateFrequencyFromAngle(angle),
    { volume: 0.33 }
  );
}

function App() {
  const [angles, setAngles] = useState([50, 200]);
  const anglesRef = useRef(angles);
  const [colors, setColors] = useColors();
  const colorsRef = useRef(colors);
  const [selectedColor, setSelectedColor] = useState<0 | 1>(0);
  const selectedColorRef = useRef(selectedColor);
  const [options] = useOptions();
  const isAltPressed = useKeyPress("Alt");
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  anglesRef.current = angles;
  colorsRef.current = colors;
  selectedColorRef.current = selectedColor;

  function className() {
    const altPressed = isAltPressed ? "alt-pressed" : "";
    const autoPlaying = isAutoplaying ? "is-autoplaying" : "";

    return `app ${altPressed} ${autoPlaying}`;
  }

  function onColorComponentChange(k: 0 | 1 | 2, angle: number) {
    const currentColors = colorsRef.current;
    const currentColor = selectedColorRef.current;
    const hsl = currentColors[currentColor];
    const v = degToPercent(angle);
    hsl[k] = v;

    const newColors = [...colors];
    newColors[currentColor] = hsl;
    setColors(newColors);
  }

  useEffect(() => {
    if(options.mode === "absolute") {
      setColors(
        [hslFromAngle(anglesRef.current[0])]
      );
      setAngles( (angles) => [angles[0]] );
    } else {
      const [ a, b ] = defaultColors
      setAngles( [a[0], b[0]] );
      setColors(defaultColors)
    }
  }, [options.mode, setColors])

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
  }, [angles, options]);

  useEffect(() => {
    function coreClick() {
      playFrequencyFromAngle(angles[0]);
    }

    bus.on("coreClick", coreClick);

    return () => {
      bus.off("coreClick", coreClick);
    }
  }, [angles]);

  return (
    <div className={className()}>
      <header className="app-header">
        <a href="https://www.suonoterapia.org" className="logo-container">
          <img src={logo} alt="Associazione Suonomusicoterapia Italiana" />
        </a>
      </header>
      <main className="app-content">
        <ColorComponentsWrapper
          selectedColor={selectedColor}
          onChange={onColorComponentChange}
        >
          <ColorPicker
            mode={
              (options.showVisibleSpectrumWheel
                || options.mode === "absolute") ? "spectrum" : "hue"
            }
            onChange={({ angles, colors }) => {
              setAngles(angles);
              setColors(colors);
            }}
            onClickHandle={(_, i) => {
              setSelectedColor(i as 0 | 1);
            }}
            radiusInner={110}
            radiusOuter={300}
            selectedColor={selectedColor}
            value={colors}>
            <Core colors={colors} />
          </ColorPicker>
        </ColorComponentsWrapper>
        <Infobox angles={angles} />
        <OptionsBox />
      </main>
      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
