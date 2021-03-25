import dictionary from "i18n";

interface TranslationWithDefault {
  $default?: string;
}

type TranslationParams = Record<string, string | number>
  & TranslationWithDefault;

const DEFAULT_LOCALE: keyof typeof dictionary = "en_US";
let currentLocale:
  keyof typeof dictionary = normalizeLanguageCode(navigator.language)
  || DEFAULT_LOCALE;

function interpolate(
  message: string,
  params: Record<string, string | number>,
  pluralize?: boolean
) {
  if(pluralize) message = message.replace(/\[(\S+)(?:\|)(\S+)\]/g, "$2");
  else message = message.replace(/\[(\S+)(?:\|)(\S+)\]/g, "$1");

  return message.replace(/\{(\w+)\}/g, (_, match) => {
    return params[match].toString();
  });
}

export function normalizeLanguageCode(code: string) {
  if( code.includes("da") ) return "da_DK";
  if( code.includes("en") ) return "en_US";
  if( code.includes("it") ) return "it_IT";
}

export function setLocale(locale: keyof typeof dictionary) {
  currentLocale = locale;
}

export function translate<T extends TranslationParams>(
  key: keyof typeof dictionary[typeof currentLocale],
  params?: T,
  pluralize?: keyof T | boolean
) {
  let isPlural;
  let message: string;
  
  if(key in dictionary[currentLocale])
    message = dictionary[currentLocale][key];
  else if(params?.$default)
    message = params.$default;
  else if(key in dictionary[DEFAULT_LOCALE])
    message = dictionary[DEFAULT_LOCALE][key];
  else
    message = key;

  if(pluralize) {
    if(typeof pluralize === "string") {
      isPlural = Number(params?.[pluralize]) > 1 || false;
    } else isPlural = true;
  }

  return params ? interpolate(message, params, isPlural) : message;
}
