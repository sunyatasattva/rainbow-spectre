import React from "react";
import Switch from "react-switch";
import camelCase from "lodash.camelcase";
import { Options } from "hooks/useGlobalState";

interface Props {
  label: string;
  onChange: (name: keyof Options, val: boolean) => any;
  value: boolean;
}

export default function Option(props: Props) {
  function handleChange(v: boolean) {
    props.onChange(
      (camelCase(props.label) as keyof Options),
      v
    );
  }

  return (
    <label>
      <span>{props.label}</span>
      <Switch onChange={handleChange} checked={props.value} />
    </label>
  )
}
