import React, { useState } from "react";
import ColorPicker from "./components/ColorPicker"
import Core from "./components/Core";
import Infobox from "./components/Infobox";
import logo from "./images/logo.svg";
import "./styles/app.scss";

const defaultColors: [string, string] = ["#ff0000", "#00ffff"];

function App() {
  const [colors, setColors] = useState<[string, string]>(defaultColors);

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
      </main>
      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
