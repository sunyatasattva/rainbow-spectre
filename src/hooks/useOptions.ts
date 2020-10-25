import { createGlobalState } from "react-hooks-global-state";

export interface Options {
  autoplay: boolean;
}

const defaultOptions = {
  autoplay: true
};

const globalState = createGlobalState({
  options: defaultOptions
});

export default function() {
  return globalState.useGlobalState("options");
}
