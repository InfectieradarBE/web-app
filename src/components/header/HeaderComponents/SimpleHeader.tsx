import React from 'react';
import { SimpleLogoHeaderConfig } from '../../../types/config/header';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';
import clsx from 'clsx';
import { getExternalOrLocalContentURL } from '../../../utils/routeUtils';


interface SimpleHeaderProps {
  config: SimpleLogoHeaderConfig;
  onChangeLanguage: (code: string) => void;
  onOpenExternalPage?: (url: string) => void;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = (props) => {
  const { t, i18n } = useTranslation(['header']);

  const renderLanguageSelector = (languages: Array<{ code: string; itemKey: string; }>) => <LanguageDropdown
    selectedLanguage={i18n.language}
    languages={languages.map(l => {
      return {
        code: l.code,
        label: t(`languages.${l.itemKey}`)
      }
    })}
    onLanguageChanged={props.onChangeLanguage}
  />


  return (
    <div className="container">
      <div className={clsx("position-relative d-flex align-items-center", props.config.className)}>
        <img
          className={clsx('d-none d-sm-inline-block', props.config.image.lg.className)}
          src={getExternalOrLocalContentURL(props.config.image.lg.url)}
          alt={props.config.image.altKey ? t(props.config.image.altKey) : 'App Logo'}
          height={props.config.image.lg.height}
          width={props.config.image.lg.width}
        />
        <div className="d-inline-block d-sm-none flex-grow-1">
          <img
            style={{ maxWidth: '100%' }}
            className={clsx(props.config.image.sm.className)}
            src={getExternalOrLocalContentURL(props.config.image.sm.url)}
            alt={props.config.image.altKey ? t(props.config.image.altKey) : 'App Logo'}
            height={props.config.image.sm.height}
            width={props.config.image.sm.width}
          />
        </div>
        {
          props.config.languages ? <React.Fragment>
            <div
              // for large screens
              className="position-absolute d-none d-sm-flex top-0 end-0 h-100  align-items-center">
              {renderLanguageSelector(props.config.languages)}
            </div>
            <div
              // for small screens
              className="ps-1 d-sm-none align-items-center">
              {renderLanguageSelector(props.config.languages)}
            </div>

          </React.Fragment>
            : null
        }
      </div>
    </div>

  );
};

export default SimpleHeader;
