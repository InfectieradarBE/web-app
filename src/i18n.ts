import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
// import store from "./store";
// import { userActions } from "./store/user/userSlice";

export const InterpolationKeys = {
    Date: "date",
}

i18n
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: process.env.REACT_APP_DEFAULT_LANGUAGE,
        fallbackLng: process.env.REACT_APP_FALLBACK_LANGUAGE,
        backend: {
            // for all available options read the backend's repository readme file
            loadPath: process.env.REACT_APP_CONTENT_URL + '/locales/{{lng}}/{{ns}}.json'
        },
        interpolation: {
            escapeValue: false, // react already safes from xss
            format: (value, format, lng) => {
                if (format === InterpolationKeys.Date) {
                    return new Intl.DateTimeFormat(lng).format(value);
                }
                return value;
            }
        },
        react: {
            useSuspense: true
        }
    })
    .then(() => {
        // store.dispatch(userActions.initializeLanguage(i18n.language));
    });

export default i18n;
