import '../styles/handle.css';
import React from 'react';
import hexToHsl from 'hex-to-hsl';

interface Props {
  initialColor: string;
  onChange: (value: number) => any;
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

  private handleRotation(e: MouseEvent) {
    if (!this.state.isMouseDown) return;
    if (!this.container.current) return;

    const boundingRect = this.container.current.getBoundingClientRect();

    const delta = {
      x: e.clientX - Math.round(boundingRect.left + boundingRect.width / 2),
      y: (e.clientY - Math.round(boundingRect.top + boundingRect.height / 2)) * -1,
    }

    const radianAngle = (Math.atan2(delta.y, delta.x) - Math.PI / 2) * -1;
    this.setState({ angle: this.radiansToDegrees(radianAngle) });

    this.props.onChange(this.state.angle);
  }

  private radiansToDegrees(x: number) {
    const theta = x * 180 / Math.PI;

    return theta < 0 ? theta + 360 : theta;
  }

  private toggleMouseDown() {
    this.setState({ isMouseDown: false });
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.toggleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleRotation.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.toggleMouseDown.bind(this));
    document.removeEventListener('mousemove', this.handleRotation.bind(this));
  }

  render() {
    return (
      <div
        className="handle-container"
        onMouseDown={() => this.setState({ isMouseDown: true })}
        ref={this.container}
        style={{
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
