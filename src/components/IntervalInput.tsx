import React, { useRef, useState } from "react";
import "../styles/interval-input.scss";
import { translate as t } from "lib/i18n";

export default function IntervalInput(props: React.HTMLProps<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setisValid] = useState(true);

  return (
    <div className="interval-input-container">
      <input
        {...props}
        autoFocus
        onChange={() => null}
        onKeyUp={(e) => {
          const isValid = inputRef.current?.checkValidity();
          setisValid(() => !!isValid);

          if(e.key === "Enter") {
            if(isValid) props.onChange?.(e);
          }
        }}
        pattern="\d+[\/|:]\d+"
        ref={inputRef}
        type="text"
      />
        <div
          className="message"
          dangerouslySetInnerHTML={{ __html: t(
            isValid ?
            "RATIO_INPUT_INFO"
            : "RATIO_INPUT_ERROR"
          )}}
        ></div>
    </div>
  );
}
