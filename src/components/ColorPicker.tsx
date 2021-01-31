import React from "react";
import hslToHex from "hsl-to-hex";
import Handle from "./Handle";
import "../styles/color-picker.scss";

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
  static defaultProps = {
    radiusInner: 0,
    radiusOuter: 250,
  }

  state = {
    value: this.props.value
  }

  private canvas = React.createRef<HTMLCanvasElement>();

  private handleChange(angle: number, i: number) {
    const newVal = [...this.state.value];
    newVal[i] = hslToHex(Math.round(angle), 100, 50);

    this.setState({ value: newVal });
    this.props.onChange && this.props.onChange(this.state.value);
  }

  private renderColorWheel(canvas: HTMLCanvasElement) {
    const radiusOuter = this.props.radiusOuter!;
    const radiusInner = this.props.radiusInner!;
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
          isReferenceHandle={i === 0}
          onChange={(angle) => this.handleChange(angle, i)}
          parentSize={this.props.radiusOuter!}
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
