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
import { HSLColor, Ratio } from "lib/types";
import Infobar from "components/Infobar";
import useHash from "hooks/useHash";
import useAngles from "hooks/useAngles";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";
import { calculateAngleFromRatio } from "lib/utils";
import useCents from "hooks/useCents";
import usePrevious from "hooks/usePrevious";
import useMobile from "hooks/useBreakpoint";

export const bus = new EventBus<{
  angleChange: ({ oldVal, newVal }: { oldVal: number, newVal: number }) => void;
  angleCommit: (deg: number) => void;
  centChange: (val: number, commit?: boolean) => void;
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
  const isMobile = useMobile(600);
  const [angles, setAngles] = useState([50, 198]);
  const anglesRef = useRef(angles);
  const [colors, setColors] = useColors();
  const colorsRef = useRef(colors);
  const [selectedColor, setSelectedColor] = useState<0 | 1>(0);
  const selectedColorRef = useRef(selectedColor);
  const [options] = useOptions();
  const isAltPressed = useKeyPress("Alt");
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [showInfobar, setShowInfobar] = useState(!isMobile);
  const [pinInfobar, setPinInfobar] = useState(false);
  const hash = useHash();
  const previousOptions = usePrevious(options);

  useAngles(angles, options, setIsAutoplaying);
  useCents([angles, setAngles], setColors);

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

  function handleRatioChange(newRatio: Ratio) {
    const angle = calculateAngleFromRatio(newRatio);
    
    setAngles((angles) => {
      const [a] = angles;
      const [aColor, bColor] = colors;
      const newAngles = [a, a + angle];

      setColors([
        aColor,
        [newAngles[1], bColor[1], bColor[2]]
      ]);

      return newAngles;
    });
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
    const angles = anglesRef.current;

    if(previousOptions?.mode !== options.mode) {
      if(options.mode === "absolute") {
        setColors(
          [hslFromAngle(angles[0])]
        );
        setAngles( (angles) => [angles[0]] );
      } else {
        const [ /**/, b ] = defaultColors
        setAngles( (angles) => [angles[0], b[0]] );
        setColors(defaultColors)
      }
    }

    
  }, [options.mode, previousOptions, setColors]);

  useEffect(() => {
    const angles = anglesRef.current;
    
    if(
      previousOptions
      && previousOptions.showVisibleSpectrumWheel
      !== options.showVisibleSpectrumWheel
    ) {
      if(options.showVisibleSpectrumWheel) {
        setColors(
          angles.map(hslFromAngle)
        );
      } else {
        setColors(
          angles.map(angle => [angle, 100, 50])
        );
      }
    }
  }, [previousOptions, options.showVisibleSpectrumWheel, setColors])

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
            value={{ angles, colors }}
          >
            <Core colors={colors} />
          </ColorPicker>
        </ColorComponentsWrapper>
        <Infobox
          angles={angles}
          onChangeRatio={handleRatioChange}
        />
        <OptionsBox />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
