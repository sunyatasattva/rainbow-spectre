import { createGlobalState } from "react-hooks-global-state";

export interface Options {
  autoplay: boolean;
  baseFrequency: number;
}

const defaultColors: [string, string] = ["#ff0000", "#00ffff"];

const defaultOptions = {
  autoplay: true,
  baseFrequency: 220
};

const globalState = createGlobalState({
  colors: defaultColors,
  options: defaultOptions
});

export function useColors() {
  return globalState.useGlobalState("colors");
}

export function useOptions() {
  return globalState.useGlobalState("options");
}

export default globalState.useGlobalState;
