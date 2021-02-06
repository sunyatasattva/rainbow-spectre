import "../styles/color-components-wrapper.scss";
import React from "react";
import { CSSTransition, SwitchTransition, Transition } from "react-transition-group";
import Handle from "./Handle";
import { useColors, useOptions } from "hooks/useGlobalState";
import { ColorComponent, HSLColor } from "lib/types";
import { hslToString } from "lib/utils";

interface Props {
  children: JSX.Element;
  selectedColor: 0 | 1;
  /**
   * Fires when one of the components circle has changed
   * 
   * @param k  Either `0 | 1 | 2` depending on `h | s | l`
   * @param v  The new value for that component
   */
  onChange?(k: ColorComponent, v: number): any;
}

const sizes: Record<
  keyof typeof ColorComponent,
  { diameter: number, strokeWidth: number }
> = {
  hue: {
    diameter: 0,
    strokeWidth: 0
  },
  lightness: {
    diameter: 360,
    strokeWidth: 5
  },
  saturation: {
    diameter: 330,
    strokeWidth: 2
  }
}

interface HandleAnimationWrapperProps {
  colorComponent: keyof typeof ColorComponent;
  onChange?(k: ColorComponent, v: number): any;
  selectedColor: 0 | 1;
}

function HandleAnimationWrapper(props: HandleAnimationWrapperProps) {
  const { colorComponent, onChange, selectedColor } = props;
  const [colors] = useColors();
  const currentColor = colors[selectedColor];
  const otherColor = selectedColor === 0 ? colors[1] : colors[0];
  const referenceComponent = ColorComponent[colorComponent];
  const className = selectedColor === 0 ? "reference-handle" : "";
  const timeout = Math.abs(
    currentColor[referenceComponent] - otherColor[referenceComponent]
  ) * 5;

  return (
    <SwitchTransition>
      <Transition key={`${selectedColor}-transition`} timeout={timeout}>
        {transitionState => {
          const isExiting = transitionState === "exiting";
          const referenceColor = isExiting ? otherColor : currentColor;
          const angle = 360 * (referenceColor[referenceComponent] / 100);

          return (
            <Handle
              className={
                `${colorComponent}-handle ${className} ${transitionState}`
              }
              initialAngle={angle}
              key={`${selectedColor}-s`}
              ignoreLock={true}
              onChange={(v) => onChange?.(referenceComponent, v)}
              parentSize={sizes[colorComponent].diameter}
              style={{
                opacity: isExiting ? 0 : 1,
                transform: `rotate(${angle}deg)`,
                transition: isExiting ? `transform ${timeout}ms ease-out,
                  opacity .1s ease-out ${timeout}ms`
                  : ""
              }}
            />
          );
        }}
      </Transition>
    </SwitchTransition>
  )
}

interface ColorComponentSliderProps {
  colorComponent: keyof typeof ColorComponent;
  selectedColor: 0 | 1;
}

function ColorComponentSlider(props: ColorComponentSliderProps) {
  const RADIUS = 15;
  const CIRCUMFERENCE = RADIUS * Math.PI * 2
  const { colorComponent, selectedColor } = props;
  const [colors] = useColors();
  const strokeWidth = sizes[props.colorComponent].strokeWidth;

  const currentColor = colors[selectedColor];
  const [h, s] = currentColor;
  const otherColor = selectedColor === 0 ? colors[1] : colors[0];
  const relevantComponent = currentColor[ ColorComponent[colorComponent] ];
  const ringTrainValue: HSLColor = [h, 50, 50];
  ringTrainValue[ColorComponent[colorComponent]] = relevantComponent;
  
  const timeout = Math.abs(
    relevantComponent - otherColor[ ColorComponent[colorComponent] ]
  ) * 5;

  return (
    <CSSTransition in={!selectedColor} timeout={timeout}>
      <g className={`ring ${colorComponent}-ring enter-done`}>
        <circle
          className="ring-track"
          cx="50%"
          cy="50%"
          stroke={`hsl(${h}deg, ${s}%, 20%)`}
          strokeWidth={strokeWidth} 
          r="15"
        />
        <circle
          className="ring-train"
          cx="50%"
          cy="50%"
          stroke={`${hslToString(ringTrainValue)}`}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={(CIRCUMFERENCE * (1 - relevantComponent/100)).toFixed(2)}
          strokeWidth={strokeWidth}
          style={{
            transition: `stroke-dashoffset ${timeout}ms ease-out`
          }}
          r={RADIUS}
        />
      </g>
    </CSSTransition>
  );
}

export default function ColorComponentsWrapper(props: Props) {
  const { onChange, selectedColor } = props;
  const [{ showColorSliders }] = useOptions();

  return (
    <div className="color-components-wrapper">
      {showColorSliders ?
        <>
          <svg className="components-rings" viewBox="0 0 35 35">
            <ColorComponentSlider
              colorComponent="lightness"
              selectedColor={selectedColor}
            />
            <ColorComponentSlider
              colorComponent="saturation"
              selectedColor={selectedColor}
            />
          </svg>
          <HandleAnimationWrapper
            colorComponent="saturation"
            onChange={onChange}
            selectedColor={selectedColor}
          />
          <HandleAnimationWrapper
            colorComponent="lightness"
            onChange={onChange}
            selectedColor={selectedColor}
          />
        </>
        : null
      }
      {props.children}
    </div>
  );
}
