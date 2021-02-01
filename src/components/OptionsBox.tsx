import "../styles/options-box.scss";
import React from "react";
import Option from "./Option";
import { Options, useOptions } from "../hooks/useGlobalState";
import { AllowedHarmonicLimit } from "lib/types";
import { mdiAbTesting, mdiMotionPlay, mdiRecordCircleOutline, mdiVariableBox } from "@mdi/js";
import { setStateProp } from "lib/utils";

export default function OptionsBox() {
  const [options, setOptions] = useOptions();

  function setOption<K extends keyof Options>(key: K, val: Options[K]) {
    return setStateProp(setOptions, key, val);
  }

  return (
    <div className="options-container">
      <h2>Options</h2>
      <ul className="options">
        <Option
          className="reference-frequency"
          helpText={`In relative mode, the color wheel is a representation
          of an octave; as such, the colors do not represent absolute values,
          but a ratio relative to each other. One of the handles in the color
          wheel (shown with a dot in the middle), represent the fixed reference
          frequency. You can change this frequency using this option.`}
          icon={mdiRecordCircleOutline}
          label="Reference frequency">
          <input
            id="reference-frequency"
            max="440"
            min="110"
            type="number"
            inputMode="decimal"
            onChange={(e) => setOption("baseFrequency", +e.target.value)}
            value={options.baseFrequency}
          />
        </Option>
        <Option
          helpText={`It is probably most useful to see ratios that have some
          sort of relevance to practical music. With this option, you can
          make sure the ratio shown in the box is among those used in
          a given temperament. A difference expressed in cents with that 
          ratio is shown below the ratio itself.`}
          icon={mdiVariableBox}
          label="Round to closest ratio"
        >
          <select
            id="n-limit"
            name="n-limit"
            onChange={(e) => setOption(
              "harmonicLimit",
                Number.isNaN(+e.target.value) ?
                e.target.value as AllowedHarmonicLimit
                : +e.target.value as AllowedHarmonicLimit
            )}
            value={options.harmonicLimit}
          >
            <option value="None">None</option>
            <option value="3">3-limit</option>
            <option value="5">5-limit</option>
            <option value="7">7-limit</option>
            <option value="11">11-limit</option>
            <option value="12-TET">12 Equal Temperament</option>
          </select>
        </Option>
        <Option
          helpText={`When this option is enabled, the interval will
          automatically play as soon as a new color from
          the color wheel is selected. When you disable this option,
          you can still play the sounds by clicking on the circle in the
          middle of the color wheel. Trick: you can play the sounds
          separately by holding [Alt] or [Option] on your keyboard
          when clicking the circle.`}
          icon={mdiMotionPlay}
          onChange={setOption}
          label="Autoplay"
          value={options.autoplay}
        />
        <Option
          helpText={`When this option is enabled, moving one handle
          on the color wheel will preserve the currently
          active ratio.`}
          icon={mdiAbTesting}
          onChange={setOption}
          label="Lock ratio"
          value={options.lockRatio}
        />
      </ul>
    </div>
  )
}
