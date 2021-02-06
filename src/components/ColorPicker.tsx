import React from "react";
import Color from "color";
import Handle from "./Handle";
import "../styles/color-picker.scss";
import { HSLColor } from "lib/types";
import {
  calculateWavelengthStep,
  wavelengthToRGB,
  wavelengthToRGBA
} from "lib/spectrum-calculator";
import { degToRad } from "lib/utils";

interface Props {
  mode: "hue" | "spectrum";
  onChange?: ({ angle, handleIdx, colors }: {
    angle: number,
    colors: HSLColor[],
    handleIdx: number
  }) => any;
  onClickHandle?: (angle: number, i: number) => any;
  radiusInner?: number;
  radiusOuter?: number;
  selectedColor: 0 | 1;
  value: HSLColor[];
}

interface State {
  value: HSLColor[];
}

export default class ColorPicker extends React.Component<Props, State> {
  static defaultProps = {
    radiusInner: 0,
    radiusOuter: 250,
  }

  state = {
    value: this.props.value
  }

  private canvas = React.createRef<HTMLCanvasElement>();

  private handleChange(angle: number, i: number) {
    const wl = ColorPicker.calculateWavelengthFromAngle(angle);
    console.log({wl});
    const newVal = [...this.state.value];
    const [/**/, s, l] = newVal[i];

    if(this.props.mode === "spectrum") {
      const hsl = Color.rgb( wavelengthToRGB(wl) ).hsl();
      newVal[i] = hsl.array() as HSLColor;
    } else {
      newVal[i] = [Math.round(angle), s, l];
    }

    this.setState({ value: newVal });
    this.props.onChange?.({
      angle,
      colors: this.state.value,
      handleIdx: i
    });
  }

  static calculateWavelengthFromAngle(angle: number) {
    return calculateWavelengthStep(360 - angle, 360);
  }

  private renderColorWheel(canvas: HTMLCanvasElement) {
    const {
      mode,
      radiusInner,
      radiusOuter
    } = this.props;

    const half = radiusOuter! / 2;
    const radius = Math.sqrt(2) * half;
    const deg = Math.PI / 180;
    const pi2 = Math.PI * 2;
    
    canvas.width = canvas.height = radiusOuter!;
    const ctx = canvas.getContext('2d');

    if(!ctx) return;

    // .02: To prevent empty moire
    const thetaOffset = 0.5 * deg + 0.02;

    // Transform coordinate system so that angles start from the top left
    ctx.translate(half, half);
    ctx.rotate( degToRad(-90) );
    ctx.translate(-half, -half);

    for (let i = 0; i < 360; i += 0.5) {
      if(mode === "spectrum") {
        const [r, g, b, a] = wavelengthToRGBA(
          ColorPicker.calculateWavelengthFromAngle(i)
        );

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      } else {
        ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
      }
        ctx.beginPath();
        ctx.moveTo(half, half);

        const startAngle = i * deg;
        const endAngle = Math.min(pi2, startAngle + thetaOffset);

        ctx.arc(half, half, radius, startAngle, endAngle);

        ctx.closePath();
        ctx.fill();
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(half, half, radiusInner!, 0, pi2);
    ctx.fillStyle = "#000";
    ctx.fill();
  }

  private renderHandles() {
    const { selectedColor, value } = this.props;

    return value.map((color, i) => {
      const referenceHandleClassName = i === 0 ? "reference-handle" : "";
      const selectedHandleClassName = i === selectedColor ? "is-selected" : "";

      return (
        <Handle
          className={`${referenceHandleClassName} ${selectedHandleClassName}`}
          handleColor={this.props.mode === "spectrum" ? color : undefined}
          initialAngle={color[0]}
          key={i}
          onChange={(angle) => this.handleChange(angle, i)}
          onClick={(angle) => this.props.onClickHandle?.(angle, i)}
          parentSize={this.props.radiusOuter!}
        />
      );
    });
  }

  componentDidMount() {
    if (!this.canvas.current) return;
    
    this.renderColorWheel(this.canvas.current);
  }

  componentDidUpdate(prev: Props) {
    if (!this.canvas.current) return;
    
    if (prev.mode !== this.props.mode)
      this.renderColorWheel(this.canvas.current);
  }

  render() {
    return (
      <div 
        className="color-picker-container"
        style={{
          width: `${this.props.radiusOuter}px`,
          height: `${this.props.radiusOuter}px`,
        }}
      >
        <canvas ref={this.canvas} />
        {this.renderHandles()}
        {this.props.children}
      </div>
    );
  }
}
