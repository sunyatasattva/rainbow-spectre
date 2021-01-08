import { AllowedHarmonicLimit } from "lib/types";
import { createGlobalState } from "react-hooks-global-state";

export interface Options {
  autoplay: boolean;
  baseFrequency: number;
  harmonicLimit?: AllowedHarmonicLimit;
  lockRatio: boolean;
  mode: "interval" | "absolute";
}

const defaultColors: [string, string] = ["#ff0000", "#00ffff"];

const defaultOptions: Options = {
  autoplay: true,
  baseFrequency: 220,
  harmonicLimit: 5,
  lockRatio: false,
  mode: "interval"
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
