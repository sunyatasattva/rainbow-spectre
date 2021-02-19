import React, { useState } from "react";
import "../styles/segment.scss";

interface Option {
  label: JSX.Element | string;
  value: string;
}

interface Props {
  onChange?(val: string): void;
  options: (string | Option)[];
  value: string;
}

export default function Segment(props: Props) {
  const { options, value } = props;
  const [selectedOption, setSelectedOption] = useState(value);

  function className(option: string) {
    return selectedOption === option ? "is-selected" : "";
  }

  function onChange(val: string) {
    setSelectedOption(val);
    props.onChange?.(val);
  }

  return (
    <div className="segmented-control-container">
      {options.map(option => {
        let label: JSX.Element;
        let value: string;

        if(typeof option !== "string") {
          label = <>{option.label}</>;
          value = option.value;
        } else {
          label = <>{option}</>;
          value = option;
        }

        return (
          <label className={className(value)} key={value}>
            <input
              type="radio"
              name="radio"
              onChange={(e) => onChange(e.target.value)}
              value={value}
            />
            {label}
          </label>
        )
      })}
    </div>
  )
}