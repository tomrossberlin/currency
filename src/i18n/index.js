import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import de from './de';
import en from './en';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = {
  de,
  en,
};

export default i18n;