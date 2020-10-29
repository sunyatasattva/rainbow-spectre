import { useColors } from "hooks/useGlobalState";
import React, { useEffect } from "react";
import ColorPicker from "./components/ColorPicker"
import Core from "./components/Core";
import Infobox from "./components/Infobox";
import OptionsBox from "./components/OptionsBox";
import { useOptions } from "./hooks/useGlobalState";
import { playColorsInterval } from "./lib/utils";
import EventBus from "./lib/EventBus";
import logo from "./images/logo.svg";
import "./styles/app.scss";

export const bus = new EventBus<{
  angleChange: ({ oldVal, newVal }: { oldVal: number, newVal: number }) => void;
  angleCommit: (deg: number) => void;
}>();

function App() {
  const [colors, setColors] = useColors();
  const [options] = useOptions();

  useEffect(() => {
    function handleAngleChange() {
      const [a, b] = colors;
      
      if(options.autoplay) playColorsInterval(a, b, options.baseFrequency);
    }
    
    bus.on("angleCommit", handleAngleChange);

    return () => {
      bus.off("angleCommit", handleAngleChange);
    }
  }, [colors, options]);

  return (
    <div className="app">
      <header className="app-header">
        <a href="https://www.suonoterapia.org" className="logo-container">
          <img src={logo} alt="Associazione Suonomusicoterapia Italiana" />
        </a>
      </header>
      <main className="app-content">
        <ColorPicker 
          onChange={(val) => {
            setColors([val[0], val[1]]);
          }}
          radiusInner={110}
          radiusOuter={300}
          value={colors}>
          <Core colors={colors} />
        </ColorPicker>
        <Infobox colors={colors} />
        <OptionsBox />
      </main>
      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
