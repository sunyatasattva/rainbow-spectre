import React, { useEffect, useRef, useState } from "react";
import "./styles/app.scss";
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
import { calculateWavelengthFromAngle, wavelengthToRGB } from "lib/spectrum-calculator";
import Color from "color";
import { HSLColor } from "lib/types";
import Infobar from "components/Infobar";
import useHash from "hooks/useHash";
import useAngles from "hooks/useAngles";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";

export const bus = new EventBus<{
  angleChange: ({ oldVal, newVal }: { oldVal: number, newVal: number }) => void;
  angleCommit: (deg: number) => void;
  coreClick: (longPress?: boolean) => void;
  corePressUp: () => void;
}>();

function hslFromAngle(angle: number) {
  const wl = calculateWavelengthFromAngle(angle);
  const color = Color.rgb(
    wavelengthToRGB(wl)
    );

  return color.hsl().array() as HSLColor;
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
  const [showInfobar, setShowInfobar] = useState(false);
  const [pinInfobar, setPinInfobar] = useState(false);
  const hash = useHash();
  
  useAngles(angles, options, setIsAutoplaying);

  anglesRef.current = angles;
  colorsRef.current = colors;
  selectedColorRef.current = selectedColor;

  function className() {
    const altPressed = isAltPressed ? "alt-pressed" : "";
    const autoPlaying = isAutoplaying ? "is-autoplaying" : "";

    return `app ${altPressed} ${autoPlaying}`;
  }

  function closeInfobarUnlessPinned(e: React.MouseEvent) {
    e.persist();

    const pathIncludesInfobar = e.nativeEvent.composedPath()
      .some(el => (el as HTMLElement).classList?.contains("infobar"));

    if(!pinInfobar && !pathIncludesInfobar) setShowInfobar(false);
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
    if(hash) setShowInfobar(true);
  }, [hash]);

  return (
    <div className={className()}>
      <AppHeader useInfobar={[showInfobar, setShowInfobar]} />
      <main
        className="app-content"
        onClick={closeInfobarUnlessPinned}
      >
        <Infobar
          active={showInfobar}
          usePin={[pinInfobar, setPinInfobar]}
        />
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
      <AppFooter />
    </div>
  );
}

export default App;
