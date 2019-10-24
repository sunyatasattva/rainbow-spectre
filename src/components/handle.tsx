import '../styles/handle.css';
import React from 'react';

const handleRotation = Symbol();
const toggleMouseDown = Symbol();

interface State {
  isMouseDown: boolean;
  radianAngle: number,
}

export default class Handle extends React.Component<{}, State> {
  private container = React.createRef<HTMLDivElement>();

  state = {
    isMouseDown: false,
    radianAngle: 0,
  };

  [handleRotation](e: MouseEvent) {
    if (!this.state.isMouseDown) return;
    if (!this.container.current) return;

    const boundingRect = this.container.current.getBoundingClientRect();

    const delta = {
      x: e.clientX - Math.round(boundingRect.left + boundingRect.width / 2),
      y: (e.clientY - Math.round(boundingRect.top + boundingRect.height / 2)) * -1,
    }

    const radianAngle = (Math.atan2(delta.y, delta.x) - Math.PI / 2) * -1;
    this.setState({ radianAngle });
  }

  [toggleMouseDown]() {
    this.setState({ isMouseDown: false });
  }

  componentDidMount() {
    document.addEventListener('mouseup', this[toggleMouseDown].bind(this));
    document.addEventListener('mousemove', this[handleRotation].bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this[toggleMouseDown].bind(this));
    document.removeEventListener('mousemove', this[handleRotation].bind(this));
  }

  render() {
    return (
      <div
        className="handle-container"
        onMouseDown={() => this.setState({ isMouseDown: true })}
        ref={this.container}
        style={{
          transform: `rotate(${this.state.radianAngle}rad)`,
        }}
      >
        <span className="handle"></span>
      </div>
    );
  }
}
