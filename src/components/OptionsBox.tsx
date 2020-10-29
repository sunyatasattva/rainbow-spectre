import React from "react";
import Option from "./Option";
import { Options, useOptions } from "../hooks/useGlobalState";

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
      <Option onChange={setOption} label="Autoplay" value={options.autoplay} />
      <Option onChange={setOption} label="Lock ratio" value={options.lockRatio} />
    </div>
  )
}
