import "../styles/handle.css";
import React from "react";
import hexToHsl from "hex-to-hsl";
import { bus } from "../app";

interface Props {
  initialColor: string;
  onChange: (value: number) => any;
  parentSize: number // Perhaps this could be calculated instead?
}

interface State {
  angle: number;
  isMouseDown: boolean;
}

export default class Handle extends React.Component<Props, State> {
  private container = React.createRef<HTMLDivElement>();

  state = {
    angle: hexToHsl(this.props.initialColor)[0],
    isMouseDown: false,
  };

  private handleMouseDown = () => {
    document.addEventListener('mouseup', this.toggleMouseDown);
    document.addEventListener('mousemove', this.handleRotation);
  }

  private handleRotation = (e: MouseEvent) => {
    if (!this.state.isMouseDown) return;
    if (!this.container.current) return;

    const boundingRect = this.container.current.getBoundingClientRect();

    const delta = {
      x: e.clientX - Math.round(boundingRect.left + boundingRect.width / 2),
      y: (e.clientY - Math.round(boundingRect.top + boundingRect.height / 2)) * -1,
    }

    const radianAngle = (Math.atan2(delta.y, delta.x) - Math.PI / 2) * -1;
    const oldVal = this.state.angle;
    const newVal = this.radiansToDegrees(radianAngle);
    this.setState({ angle: newVal });

    this.props.onChange(this.state.angle);
    bus.emit("angleChange", { oldVal, newVal });
  }

  private radiansToDegrees(x: number) {
    const theta = x * 180 / Math.PI;

    return theta < 0 ? theta + 360 : theta;
  }

  private toggleMouseDown = () => {
    this.setState({ isMouseDown: false });

    document.removeEventListener('mouseup', this.toggleMouseDown);
    document.removeEventListener('mousemove', this.toggleMouseDown);

    bus.emit("angleCommit", this.state.angle);
  }

  componentDidMount() {
    if(!this.container.current) return;

    this.container.current.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  render() {
    return (
      <div
        className="handle-container"
        onMouseDown={() => this.setState({ isMouseDown: true })}
        ref={this.container}
        style={{
          width: `${this.props.parentSize}px`,
          height: `${this.props.parentSize}px`,
          transform: `rotate(${this.state.angle}deg)`,
        }}
      >
        <span
          className="handle"
          style={{
            backgroundColor: `hsl(${this.state.angle}deg, 100%, 50%)`
          }}
        >
        </span>
      </div>
    );
  }
}
