import React, { useEffect, useRef, useState } from "react";
import "./styles/app.scss";
import logo from "./images/logo.svg";
import overtoneLogo from "./images/overtone.svg";
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
import Infobar from "components/Infobar";
import Icon from "@mdi/react";
import { defaultIconProps } from "components/Option";
import { mdiFacebook, mdiInformationVariant } from "@mdi/js";
import useHash from "hooks/useHash";

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
  const [showInfobar, setShowInfobar] = useState(false);
  const [pinInfobar, setPinInfobar] = useState(false);
  const hash = useHash();

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

  useEffect(() => {
    if(hash) setShowInfobar(true);
  }, [hash]);

  return (
    <div className={className()}>
      <header className="app-header">
        <a href="https://www.suonoterapia.org" className="logo-container">
          <img src={logo} alt="Associazione Suonomusicoterapia Italiana" />
        </a>
        <nav>
          <ul>
            <li className="toggle-button-container overtone-link-container">
              <a href="https://www.suonoterapia.org/overtones">
                <img src={overtoneLogo} alt="Representation of 8th Overtone" />
                Overtone Spiral
              </a>
            </li>
            <li className={
              `toggle-button-container toggle-infobar-button-container`
            }>
              <button
                className={showInfobar ? "is-active" : ""}
                onClick={() => setShowInfobar(!showInfobar)}>
                <Icon
                  {...defaultIconProps}
                  path={mdiInformationVariant}
                />
              </button>
            </li>
            <li className="toggle-button-container facebook-button-container">
              <a
                href="https://www.facebook.com/suonoterapia"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon
                  color="#ccc"
                  path={mdiFacebook}
                  size={1.5}
                />
              </a>
            </li>
          </ul>
        </nav>
      </header>
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
      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
