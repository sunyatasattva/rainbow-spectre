import React from "react";
import "../styles/app-footer.scss";
import {ReactComponent as PayPalIcon} from "../images/paypal-icon.svg";
import { mdiFacebook, mdiGithub, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";
import { FacebookShareButton, TwitterShareButton } from "react-share";

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <p className="credits">
        Designed and crafted with joy by&nbsp;
        <a href="https://facebook.com/sunyatasattva">Marco Lucio Giannotta</a> and&nbsp;
        <a href="https://www.facebook.com/skye.lofvander">Skye Løfvander</a>.
        <span className="version">
          &nbsp;Version&nbsp;
          <a href="https://github.com/sunyatasattva/rainbow-spectre/releases/">
          1.0.0
          </a>
        </span>
      </p>
      <div className="social">
        <ul>
          <li className="donate">
            <a href="https://paypal.me/sunyatasattva" >
              <PayPalIcon />
              <span>Donate</span>
            </a>
          </li>
          <li className="share-facebook">
            <FacebookShareButton
              className="facebook-button"
              url="https://suonoterapia.org/rainbow">
              <Icon
                path={mdiFacebook}
                size={.5}
              />
              Share
            </FacebookShareButton>
          </li>
          <li className="share-twitter">
            <TwitterShareButton
              url="https://suonoterapia.org/rainbow"
              >
              <Icon
                path={mdiTwitter}
                size={.5}
              />
              Tweet
            </TwitterShareButton>
          </li>
          <li className="github">
            <a href="https://github.com/sunyatasattva/rainbow-spectre">
              <Icon
                path={mdiGithub}
                size={.5}
              />
              Source
            </a>
          </li>
        </ul>
      </div>
  </footer>
);
}
