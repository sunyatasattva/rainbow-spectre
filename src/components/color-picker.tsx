import '../styles/color-picker.css';
import Handle from './handle';
import React from 'react';

export default class ColorPicker extends React.Component {
  render() {
    return (
      <div className="color-picker-container">
        <Handle />
      </div>
    );
  }
}
