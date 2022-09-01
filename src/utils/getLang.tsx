export default () => {
  const LANGUAGES = [
    'da',
    'da-DK',
    'de',
    'de-DE',
    'en',
    'en-GB',
    'en-US',
    'es',
    'es-ES',
    'fr',
    'fr-FR',
    'it',
    'it-IT',
    'ja',
    'ja-JP',
    'ko',
    'ko-KR',
    'nl',
    'nl-NL',
    'pl',
    'pl-PL',
    'pt',
    'pt-BR',
    'sv',
    'sv-SE',
    'zh',
    'zh-TW',
    'zh-CN'
  ];
  let lang = navigator.language;
  // 1. matching xx-YY patterns
  if (LANGUAGES.indexOf(lang) < 0) {
    const separatorIndex = lang.indexOf('-');
    if (separatorIndex >= 0) {
      lang = lang.substring(0, separatorIndex);
    }
    // 2. matching xx
    if (LANGUAGES.indexOf(lang) < 0) {
      lang = 'en';
    }
  }
  return lang;
};
