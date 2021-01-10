import "../styles/difference-bar.scss";
import React from "react";

interface Props {
  value: number;
}

export default function DifferenceBar(props: Props) {
  const { value } = props;
  const pos = Math.max( -50, Math.min(value, 50) );

  return (
    <div className="cents-difference" style={{ textIndent: `${pos * 2}%` }}>
      <span className="cents">{value > 0 ? `+${value}` : value} ¢</span>
      <div
        className="cent-bar"
        style={{ left: `${50 + pos}%` }}>
      </div>
    </div>
  );
}
