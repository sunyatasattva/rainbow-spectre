import React from "react";
import "../styles/app-footer.scss";
import {ReactComponent as PayPalIcon} from "../images/paypal-icon.svg";
import { mdiFacebook, mdiGithub, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { translate as t} from "lib/i18n";

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <p className="credits">
        <span dangerouslySetInnerHTML={{ __html: t("CREDITS")}}></span>
        <span className="version" dangerouslySetInnerHTML={{
          __html: t("VERSION_INFO")
        }}>
        </span>
      </p>
      <div className="social">
        <ul>
          <li className="donate">
            <a href="https://paypal.me/sunyatasattva" >
              <PayPalIcon />
              <span>{t("SOCIAL_DONATE")}</span>
            </a>
          </li>
          <li className="share-facebook">
            <FacebookShareButton
              className="facebook-button"
              url="https://suonoterapia.org/sound-of-color">
              <Icon
                path={mdiFacebook}
                size={.5}
              />
              {t("SOCIAL_SHARE")}
            </FacebookShareButton>
          </li>
          <li className="share-twitter">
            <TwitterShareButton
              url="https://suonoterapia.org/sound-of-color"
              >
              <Icon
                path={mdiTwitter}
                size={.5}
              />
              {t("SOCIAL_TWEET")}
            </TwitterShareButton>
          </li>
          <li className="github">
            <a href="https://github.com/sunyatasattva/rainbow-spectre">
              <Icon
                path={mdiGithub}
                size={.5}
              />
              {t("SOCIAL_SOURCE")}
            </a>
          </li>
        </ul>
      </div>
  </footer>
);
}
