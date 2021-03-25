import React, { useEffect, useRef, useState } from "react";
import "../styles/language-switcher.scss";
import dictionary from "i18n";
import { useOptions } from "hooks/useGlobalState";
import { setLocale } from "lib/i18n";
import { setStateProp } from "lib/utils";

const languagesMap = {
  "da_DK": "Dansk",
  "en_US": "English",
  "it_IT": "Italiano"
} as const;

interface Props {
  direction: "bottom" | "top"
}

export default function LanguageSwitcher(props: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [options, setOptions] = useOptions();
  const toggleButtonRef = useRef(null);

  function className() {
    const isActive = showMenu ? "is-active" : "";
    const direction = `menu-direction-${props.direction}`;

    return `${isActive} ${direction}`;
  }

  function updateLocale(locale: keyof typeof dictionary) {
    setStateProp(setOptions, "currentLocale", locale);
    setLocale(locale);
  }

  useEffect(() => {
    function closeDropdown(e: MouseEvent) {
      if(e.target === toggleButtonRef.current) return;
      setShowMenu(false);
    }

    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    }
  }, []);

  return (
    <div className={`language-switcher ${className()}`}>
      <button
        className="language toggle-menu"
        onClick={() => setShowMenu(!showMenu)}
        ref={toggleButtonRef}
      >
        {languagesMap[options.currentLocale]}
      </button>
      <ul className="languages-list">
        {(Object.keys(dictionary) as Array<keyof typeof dictionary>)
          .map((languageCode) => (
            <li key={languageCode}>
              <button
                className={
                  `language ${languageCode === options.currentLocale
                      ? "current-language" : ""
                  }`
                }
                onClick={() => updateLocale(languageCode)}
              >
                {languagesMap[languageCode]}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
