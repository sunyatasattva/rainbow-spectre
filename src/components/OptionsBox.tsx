import "../styles/options-box.scss";
import React from "react";
import Option, { defaultIconProps } from "./Option";
import { Options, useOptions } from "../hooks/useGlobalState";
import { AllowedHarmonicLimit } from "lib/types";
import { mdiAbTesting, mdiCircleMultiple, mdiMotionPlay, mdiMusic, mdiMusicNoteQuarter, mdiPalette, mdiRecordCircleOutline, mdiVariableBox, mdiWaveform } from "@mdi/js";
import { setStateProp } from "lib/utils";
import Segment from "./Segment";
import Icon from "@mdi/react";
import { translate as t } from "lib/i18n";

export default function OptionsBox() {
  const [options, setOptions] = useOptions();

  function setOption<K extends keyof Options>(key: K, val: Options[K]) {
    return setStateProp(setOptions, key, val);
  }

  return (
    <div className="options-container">
      <h2>{t("OPTIONS_HEADER")}</h2>
      <ul className="options">
        <Option
          className="option-mode"
          helpText={t("OPTION_MODE_HELP")}
          icon={mdiCircleMultiple}
          label={t("OPTION_MODE_LABEL")}>
            <Segment
              onChange={(val: Options["mode"]) => {
                if(val === "absolute") setOption("showColorSliders", false);
                setOption("mode", val)
              }}
              options={[
                {
                  label: (
                    <>
                      <Icon {...defaultIconProps} size={0.5} path={mdiMusic} />
                      {t("OPTION_MODE_INTERVAL_LABEL")}
                    </>
                  ),
                  value: "interval"
                },
                {
                  label: (
                    <>
                      <Icon
                        {...defaultIconProps}
                        size={0.5}
                        path={mdiMusicNoteQuarter}
                      />
                      {t("OPTION_MODE_ABSOLUTE_LABEL")}
                    </>
                  ),
                  value: "absolute"
                }
              ]}
              value={options.mode}
            />
        </Option>
        <Option
          className="option-autoplay"
          helpText={t("OPTION_AUTOPLAY_HELP")}
          icon={mdiMotionPlay}
          onChange={setOption}
          label={t("OPTION_AUTOPLAY_LABEL")}
          optionName="autoplay"
          value={options.autoplay}
        />
        {options.mode === "interval" ?
          <>
            <Option
              className="option-reference-frequency"
              helpText={t("OPTION_REFERENCE_HELP")}
              icon={mdiRecordCircleOutline}
              label={t("OPTION_REFERENCE_LABEL")}
            >
              <input
                id="reference-frequency"
                max="440"
                min="110"
                type="number"
                inputMode="decimal"
                onChange={(e) => setOption("baseFrequency", +e.target.value)}
                value={options.baseFrequency}
              />
            </Option>
            <Option
              className="option-round"
              helpText={t("OPTION_ROUND_HELP")}
              icon={mdiVariableBox}
              label={t("OPTION_ROUND_LABEL")}
            >
              <select
                id="n-limit"
                name="n-limit"
                onChange={(e) => setOption(
                  "harmonicLimit",
                    Number.isNaN(+e.target.value) ?
                    e.target.value as AllowedHarmonicLimit
                    : +e.target.value as AllowedHarmonicLimit
                )}
                value={options.harmonicLimit}
              >
                <option value="None">{t("OPTION_ROUND_O_NONE")}</option>
                <option value="3">{t("OPTION_ROUND_O_LIMIT", { n: 3 })}</option>
                <option value="5">{t("OPTION_ROUND_O_LIMIT", { n: 5 })}</option>
                <option value="7">{t("OPTION_ROUND_O_LIMIT", { n: 7 })}</option>
                <option value="11">{t("OPTION_ROUND_O_LIMIT", { n: 11 })}</option>
                <option value="12-TET">{t("OPTION_ROUND_O_12TET")}</option>
              </select>
            </Option>
            <Option
              disabled={options.showVisibleSpectrumWheel}
              helpText={t("OPTION_COLOR_SLIDERS_HELP")}
              icon={mdiPalette}
              onChange={setOption}
              label={t("OPTION_COLOR_SLIDERS_LABEL")}
              optionName="showColorSliders"
              value={options.showColorSliders}
            />
            <Option
              helpText={t("OPTION_LOCK_RATIO_HELP")}
              icon={mdiAbTesting}
              onChange={setOption}
              label={t("OPTION_LOCK_RATIO_LABEL")}
              optionName="lockRatio"
              value={options.lockRatio}
            />
            <Option
              helpText={t("OPTION_VISIBLE_SPECTRUM_HELP")}
              icon={mdiWaveform}
              onChange={
                (k, v) => {
                  setOption(k, v);
                  setOption("showColorSliders", false);
                }
              }
              label={t("OPTION_VISIBLE_SPECTRUM_LABEL")}
              optionName="showVisibleSpectrumWheel"
              value={options.showVisibleSpectrumWheel}
            />
          </>
        : null
      }
      </ul>
    </div>
  )
}
