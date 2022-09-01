import {createInstance} from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import getLang from '../utils/getLang';
import locales from './locales';

const i18nInstance = createInstance();

/**
 * "void" is needed to prevent floating promises
 * https://typescript-eslint.io/rules/no-floating-promises/#ignorevoid
*/
void i18nInstance
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: getLang(),
    fallbackLng: 'en',
    load: 'all',
    defaultNS: 'common',
    fallbackNS: 'common',
    interpolation: { escapeValue: false },
    nonExplicitSupportedLngs: true,
    keySeparator : false,
    nsSeparator: false
  });

moment.locale(i18nInstance.language);

export default i18nInstance;
