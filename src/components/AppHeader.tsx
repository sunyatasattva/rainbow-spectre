import React from "react";
import "../styles/app-header.scss";
import { mdiFacebook, mdiInformationVariant } from "@mdi/js";
import Icon from "@mdi/react";
import logo from "../images/logo.svg";
import overtoneLogo from "../images/overtone.svg";
import { translate as t } from "lib/i18n";
import { defaultIconProps } from "./Option";

interface Props {
  useInfobar: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function AppHeader(props: Props) {
  const [showInfobar, setShowInfobar] = props.useInfobar;

  return (
    <header className="app-header">
      <a href="https://www.suonoterapia.org" className="logo-container">
        <img src={logo} alt="Associazione Suonomusicoterapia Italiana" />
      </a>
      <nav>
        <ul className="asmi-nav">
          <li className="toggle-button-container overtone-link-container">
            <a href="https://www.suonoterapia.org/overtones">
              <img src={overtoneLogo} alt="Representation of 8th Overtone" />
              {t("OVERTONE_SPIRAL")}
            </a>
          </li>
        </ul>
        <ul className="utility-nav">
          <li className={
            `toggle-button-container toggle-infobar-button-container`
          }>
            <button
              className={showInfobar ? "is-active" : ""}
              onClick={() => setShowInfobar(!showInfobar)}>
              <Icon
                {...defaultIconProps}
                path={mdiInformationVariant}
              />
            </button>
          </li>
          <li className="toggle-button-container facebook-button-container">
            <a
              href="https://www.facebook.com/suonoterapia"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon
                color="#ccc"
                path={mdiFacebook}
                size={1.5}
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
