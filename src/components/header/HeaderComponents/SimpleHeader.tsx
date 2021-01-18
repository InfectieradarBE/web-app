import React from 'react';
import { SimpleLogoHeaderConfig } from '../../../types/config/header';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';
import clsx from 'clsx';


interface SimpleHeaderProps {
    config: SimpleLogoHeaderConfig;
    onChangeLanguage: (code: string) => void;
    onOpenExternalPage?: (url: string) => void;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = (props) => {
    const { t, i18n } = useTranslation(['header']);

    return (
        <div className="container">
            <div className={clsx("position-relative", props.config.className)}>
                <img
                    className={clsx('d-none d-sm-block', props.config.image.lg.className)}
                    src={process.env.REACT_APP_CONTENT_URL + props.config.image.lg.url}
                    alt={props.config.image.altKey ? t(props.config.image.altKey) : 'App Logo'}
                    height={props.config.image.lg.height}
                    width={props.config.image.lg.width}
                />
                <img
                    className={clsx('d-block d-sm-none', props.config.image.sm.className)}
                    src={process.env.REACT_APP_CONTENT_URL + props.config.image.sm.url}
                    alt={props.config.image.altKey ? t(props.config.image.altKey) : 'App Logo'}
                    height={props.config.image.sm.height}
                    width={props.config.image.sm.width}
                />
                {
                    props.config.languages ?
                        <div
                            className="position-absolute top-0 end-0 h-100 d-flex align-items-center">
                            <LanguageDropdown
                                selectedLanguage={i18n.language}
                                languages={props.config.languages.map(l => {
                                    return {
                                        code: l.code,
                                        label: t(`languages.${l.itemKey}`)
                                    }
                                })}
                                onLanguageChanged={props.onChangeLanguage}
                            />
                        </div> : null
                }
            </div>
        </div>

    );
};

export default SimpleHeader;
