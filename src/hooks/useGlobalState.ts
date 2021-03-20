import dictionary from "i18n";
import { normalizeLanguageCode } from "lib/i18n";
import { AllowedHarmonicLimit, HSLColor } from "lib/types";
import { createGlobalState } from "react-hooks-global-state";

export interface Options {
  autoplay: boolean;
  baseFrequency: number;
  currentLocale: keyof typeof dictionary,
  harmonicLimit: AllowedHarmonicLimit;
  lockRatio: boolean;
  mode: "interval" | "absolute";
  showColorSliders: boolean;
  showVisibleSpectrumWheel: boolean;
}

export const defaultColors: HSLColor[] = [
  [50, 100, 50],
  [198, 100, 50]
];


const userLang = normalizeLanguageCode(navigator.language);

const defaultOptions: Options = {
  autoplay: true,
  baseFrequency: 220,
  currentLocale: dictionary[userLang as keyof typeof dictionary]
    ? userLang! : "en_US",
  harmonicLimit: 5,
  lockRatio: false,
  mode: "interval",
  showColorSliders: false,
  showVisibleSpectrumWheel: false,
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
