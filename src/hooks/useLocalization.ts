import { useTranslation } from "react-i18next";
import { LocalizedObject, LocalizedString } from "survey-engine/lib/data_types";

export const useLocalization = () => {
  const { i18n } = useTranslation();


  const getLocalizationByLocaleCode = (translations: LocalizedObject[] | undefined, code: string): string | undefined => {
    if (!translations) { return; }
    const translation = (translations.find(cont => cont.code === code) as LocalizedString);
    if (!translation) {
      if (translations.length > 0) {
        return (translations[0] as LocalizedString).parts.map(p => p.str).join('');
      }
      return
    }
    return translation.parts.map(p => p.str).join('');
  }

  const getLocalization = (translations: LocalizedObject[] | undefined) => getLocalizationByLocaleCode(translations, i18n.language);

  return getLocalization;
}
