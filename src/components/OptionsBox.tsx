import React from "react";
import Option from "./Option";
import { Options, useOptions } from "../hooks/useGlobalState";
import { AllowedHarmonicLimit } from "lib/types";

export default function OptionsBox() {
  const [options, setOptions] = useOptions();

  function setOption<K extends keyof Options>(key: K, val: Options[K]) {
    return setOptions((prev) => {
      return {
        ...prev,
        [key]: val
      };
    });
  }

  return (
    <div className="options-container">
      <div className="input-container">
        <label htmlFor="reference-frequency">Reference frequency</label>
        <input 
          id="reference-frequency"
          type="number"
          onChange={(e) => setOption("baseFrequency", +e.target.value)}
          value={options.baseFrequency}
        />
      </div>
      <div className="input-container">
        <label htmlFor="n-limit">Snap to closest ratio</label>
        <select
          id="n-limit"
          name="n-limit"
          onChange={(e) => setOption(
            "harmonicLimit",
            +e.target.value as AllowedHarmonicLimit
          )}
          value={options.harmonicLimit}
        >
          <option>None</option>
          <option value="3">3-limit</option>
          <option value="5">5-limit</option>
          <option value="7">7-limit</option>
          <option value="11">11-limit</option>
        </select>
      </div>
      <Option onChange={setOption} label="Autoplay" value={options.autoplay} />
      <Option onChange={setOption} label="Lock ratio" value={options.lockRatio} />
    </div>
  )
}
