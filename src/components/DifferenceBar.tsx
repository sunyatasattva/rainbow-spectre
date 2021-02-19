import "../styles/difference-bar.scss";
import React from "react";
import DraggableNumberInput from "./DraggableNumberInput";
import { bus } from "app";

interface Props {
  value: number;
}

export default function DifferenceBar(props: Props) {
  const { value } = props;
  const pos = Math.max( -50, Math.min(value, 50) );

  return (
    <div className="cents-difference" style={{ textIndent: `${pos * 2}%` }}>
      {value > 0 ? "+" : null}
      <DraggableNumberInput
        dragDirection="X"
        onChange={(_, delta) => delta && bus.emit("centChange", delta)}
        onDragEnd={() => bus.emit("centChange", value, true)}
        readOnly
        value={value}
      />
      <div
        className="cent-bar"
        style={{ left: `${50 + pos}%` }}>
      </div>
    </div>
  );
}
