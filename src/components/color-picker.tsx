import React from "react";
import Handle from "./handle";
import "../styles/color-picker.css";

interface Props {
  onChange?: (colors: string[]) => any;
  radiusInner?: number;
  radiusOuter?: number;
  value: string[];
}

interface State {
  value: string[];
}

export default class ColorPicker extends React.Component<Props, State> {
  state = {
    value: this.props.value
  }

  private canvas = React.createRef<HTMLCanvasElement>();

  private handleChange = (angle: number, i: number) => {
    const newColorString = `hsl(${Math.round(angle)}deg, 100%, 50%)`;
    const newVal = [...this.state.value];
    newVal[i] = newColorString;

    this.setState({ value: newVal });
    this.props.onChange && this.props.onChange(this.state.value);
  }

  private renderColorWheel(canvas: HTMLCanvasElement) {
    const radiusOuter = this.props.radiusOuter || 250;
    const radiusInner = this.props.radiusInner || 0;
    const half = radiusOuter / 2;
    const radius = Math.sqrt(2) * half;
    const deg = Math.PI / 180;
    const pi2 = Math.PI * 2;
    
    canvas.width = canvas.height = radiusOuter;
    const ctx = canvas.getContext('2d');

    if(!ctx) return;

    // .02: To prevent empty moire
    const thetaOffset = 0.5 * deg + 0.02;

    // Transform coordinate system so that angles start from the top left
    ctx.translate(half, half);
    ctx.rotate(-Math.PI / 2);
    ctx.translate(-half, -half);

    for (let i = 0; i < 360; i += 0.5) {
        ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
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
    ctx.arc(half, half, radiusInner, 0, pi2);
    ctx.fill();
  }

  private renderHandles() {
    const { value } = this.props;

    return value.map((color, i) => {
      return (
        <Handle
          key={i}
          initialColor={color}
          onChange={(angle) => this.handleChange(angle, i)}
        />
      );
    });
  }

  componentDidMount() {
    if (!this.canvas.current) return;
    
    this.renderColorWheel(this.canvas.current);
  }

  render() {
    return (
      <div className="color-picker-container">
        <canvas ref={this.canvas} />
        {this.renderHandles()}
      </div>
    );
  }
}
