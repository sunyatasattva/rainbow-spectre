import "../styles/infobar.scss";
import React from "react";
import useHash from "hooks/useHash";
import { CSSTransition } from "react-transition-group";
import { translate as t } from "lib/i18n";
import Icon from "@mdi/react";
import { mdiLinkBoxVariant, mdiPin, mdiPinOff } from "@mdi/js";
import { defaultIconProps } from "./Option";

interface Props {
  active: boolean;
  usePin: [
    isPinned: boolean,
    setIsPinned: React.Dispatch<React.SetStateAction<boolean>>
  ];
}

interface Section {
  content: string;
  title: string;
}

const sections: Record<string, Section> = {
  "what-is-this": {
    content: t("WHAT_IS_THIS_CONTENT"),
    title: t("WHAT_IS_THIS_TITLE")
  },
  "how-do-the-ends-meet": {
    content: t("HOW_DO_ENDS_MEET_CONTENT"),
    title: t("HOW_DO_ENDS_MEET_TITLE")
  },
  "what-about-sound": {
    content: t("WHAT_ABOUT_SOUND_CONTENT"),
    title: t("WHAT_ABOUT_SOUND_TITLE")
  },
  "one-color-one-sound": {
    content: t("ONE_COLOR_ONE_SOUND_CONTENT"),
    title: t("ONE_COLOR_ONE_SOUND_TITLE")
  }
}

export default function Infobar(props: Props) {
  const [isPinned, setIsPinned] = props.usePin;
  const hash = useHash();

  return (
    <CSSTransition appear in={props.active} timeout={1000}>
      <aside className="infobar">
        <h1 className="section-title">
          {t("INFOBAR_TITLE")}
          <div className="toggle-button-container">
            <button
              className={
                `pin-infobar-button ${isPinned ? "is-active" : ""}`
              }
              onClick={() => setIsPinned(!isPinned)}
            >
              <Icon
                {...defaultIconProps}
                path={isPinned ? mdiPin : mdiPinOff}
              />
            </button>
          </div>
        </h1>
        <div
          className="section-content"
          dangerouslySetInnerHTML={{ __html: t("TL_DR") }}
          id="tl-dr">
        </div>
        {Object.entries(sections).map(([id, section]) => (
          <section
            className={id === hash ? "is-active" : ""}
            id={id}
            key={id}
          >
            <a href={`#${id}`}>
              <h2 className="section-title">{section.title}</h2>
              <Icon
                color="#888"
                path={mdiLinkBoxVariant}
                size={1.5}
              />
            </a>
            <div
              className="section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}>
            </div>
          </section>
        ))}
      </aside>
    </CSSTransition>
  )
}
