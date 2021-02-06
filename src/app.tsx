import { useColors } from "hooks/useGlobalState";
import React, { useEffect, useRef, useState } from "react";
import ColorPicker from "./components/ColorPicker"
import Core from "./components/Core";
import Infobox from "./components/Infobox";
import OptionsBox from "./components/OptionsBox";
import { useOptions } from "./hooks/useGlobalState";
import { playColorsInterval } from "./lib/utils";
import EventBus from "./lib/EventBus";
import logo from "./images/logo.svg";
import "./styles/app.scss";
import { useKeyPress } from "hooks/useKeyPress";
import ColorComponentsWrapper from "components/ColorComponentsWrapper";
import { HSLColor } from "lib/types";
import { degToPercent } from "lib/math";

export const bus = new EventBus<{
  angleChange: ({ oldVal, newVal }: { oldVal: number, newVal: number }) => void;
  angleCommit: (deg: number) => void;
}>();

function App() {
  const [angle, setAngle] = useState(0);
  const [colors, setColors] = useColors();
  const colorsRef = useRef(colors);
  const [selectedColor, setSelectedColor] = useState<0 | 1>(0);
  const selectedColorRef = useRef(selectedColor);
  const [options] = useOptions();
  const isAltPressed = useKeyPress("Alt");

  colorsRef.current = colors;
  selectedColorRef.current = selectedColor;

  function onColorComponentChange(k: 0 | 1 | 2, angle: number) {
    const currentColors = colorsRef.current;
    const currentColor = selectedColorRef.current;
    const hsl = currentColors[currentColor];
    const v = degToPercent(angle);
    hsl[k] = v;

    const newColors: [HSLColor, HSLColor] = [...colors];
    newColors[currentColor] = hsl;
    setColors(newColors);
  }

  useEffect(() => {
    function handleHueChange() {
      const [a, b] = colors;
      
      if(options.autoplay) playColorsInterval(a, b, options.baseFrequency);
    }

    bus.on("angleCommit", handleHueChange);

    return () => {
      bus.off("angleCommit", handleHueChange);
    }
  }, [colors, options]);

  return (
    <div className={`app ${isAltPressed ? "alt-pressed" : ""}`}>
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
            mode={options.showVisibleSpectrumWheel ? "spectrum" : "hue"}
            onChange={({ angle, colors }) => {
              setAngle(angle);
              setColors([colors[0], colors[1]]);
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
        <Infobox
          angle={angle}
          colors={colors}
        />
        <OptionsBox />
      </main>
      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
