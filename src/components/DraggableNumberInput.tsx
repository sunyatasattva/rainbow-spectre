import React, { useRef, useState } from "react";

type DragDirection = "X" | "Y";

interface Props {
  defaultValue?: number;
  dragDirection?: DragDirection;
  label?: string;
  max?: number;
  min?: number;
  onChange?: (val: number, delta?: number) => void;
  onDragEnd?: (val: number) => void;
  step?: number;
  value: number;
}

export default function DraggableNumberInput({
  defaultValue = 0,
  dragDirection = "Y" as DragDirection,
  label = "",
  max = Infinity,
  min = -Infinity,
  step = 1,
  className,
  onChange,
  onDragEnd,
  value,
  ...inputProps
}: Props 
  & Omit<
    React.HTMLProps<HTMLInputElement>,
    "onChange" | "onDragEnd" | "value"
  >
) {
  const [/* */, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorDirection = dragDirection === "Y" ? "ns-resize" : "ew-resize";
  const inputName = `draggable-number-${
    label.toLowerCase().replace(" ", "-")
  }`;

  function adjustValue(e: MouseEvent) {
    const { movementX, movementY } = e;
    
    const delta = step * (
      dragDirection === "Y" ? -movementY : movementX
    );
    let newVal = value + delta;
    if(newVal < min) newVal = Math.max(newVal, min);
    else if(newVal > max) newVal = Math.min(newVal, max);

    onChange?.(newVal, delta);
  }

  function dragEnd() {
    setIsDragging(false);

    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    document.removeEventListener("mousemove", adjustValue);
    document.removeEventListener("mouseup", dragEnd);

    inputRef.current && onDragEnd?.(+inputRef.current.value);
  }

  function dragStart() {
    document.body.style.cursor = cursorDirection;
    document.body.style.userSelect = "none";
    
    document.addEventListener("mousemove", adjustValue);
    document.addEventListener("mouseup", dragEnd);
  }

  return (
    <div
      className={
        `react-draggable-number-input-container ${
          className ? className : ""
        }`
      }
      onMouseDown={dragStart}
    >
      {label ?
        <label
          htmlFor={inputName}
          style={{ cursor: cursorDirection }}
        >
          {label}
        </label>
        : null
      }
      <input
        {...inputProps}
        max={max}
        min={min}
        name={inputName}
        onChange={(e) => {
          const newVal = +e.target.value;
          onChange?.(newVal, newVal - value);
        }}
        ref={inputRef}
        step={step}
        style={{ cursor: cursorDirection }}
        type="number"
        value={value}
      />
    </div>
  );
}
