import "../styles/option.scss";
import React, { useState } from "react";
import Switch from "react-switch";
import camelCase from "lodash.camelcase";
import { Options } from "hooks/useGlobalState";
import Icon from "@mdi/react";
import { mdiInformationVariant } from "@mdi/js";

interface Props {
  className?: string;
  helpText?: string;
  icon?: string;
}
interface CustomInputProps extends Props {
  children?: JSX.Element;
  disabled?: never;
  label: string;
  onChange?: never;
  value?: never;
}
interface SwitchProps extends Props {
  children?: never;
  disabled?: boolean;
  label: string;
  onChange: (name: keyof Options, val: boolean) => any;
  optionName?: keyof Options;
  value: boolean;
}

export const defaultIconProps = {
  className: "icon",
  color: "#fff",
  size: 1
}

export default function Option(props: CustomInputProps | SwitchProps) {
  const [showHelp, setShowHelp] = useState(false);

  function handleChange(v: boolean) {
    props.onChange?.(
      props.optionName || (camelCase(props.label) as keyof Options),
      v
    );
  }

  function helpClassName() {
    return `${defaultIconProps.className} ${showHelp ? "is-active" : ""}`
  }

  function toggleDescription() {
    setShowHelp(!showHelp);
  }

  return (
    <div className={`option ${props.className ? props.className : ""}`}>
      <div className="controls">
        <label>
          <span className="label-text">
            {props.icon ?
              <Icon {...defaultIconProps} path={props.icon} />
              : null
            }
            {props.label}
          </span>
          {!props.children ?
            <Switch
              checked={props.value!}
              checkedIcon={false}
              disabled={props.disabled}
              offColor="#444"
              onColor="#4c9c4c"
              onChange={handleChange}
              uncheckedIcon={false}
            />
            :
            <div className="input-wrapper">
              {props.children}
            </div>
          }
        </label>
        {props.helpText ?
          <div className="icon-container" onClick={toggleDescription}>
            <Icon
              {...defaultIconProps}
              className={helpClassName()}
              path={mdiInformationVariant}
            />
          </div>
          : null
        }
      </div>
      {showHelp ?
        <p className="help-text">
          {props.helpText}
        </p>
        : null
      }
    </div>
  )
}
