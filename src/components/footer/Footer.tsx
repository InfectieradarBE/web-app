import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { containerClassName } from '../../constants';
import { FooterContentConfig } from '../../types/config/footerContent';
import FooterColumn from './FooterComponents/FooterColumn';

interface FooterProps {
  loading?: boolean;
  content?: FooterContentConfig;
  onChangeLanguage: (code: string) => void;
  onOpenExternalPage: (url: string) => void;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { t } = useTranslation(['footer']);
  const history = useHistory();

  const handleNavigation = (url: string, external?: boolean) => {
    if (external) {
      props.onOpenExternalPage(url);
      return;
    }
    history.push(url)
  }

  if (props.loading || !props.content) {
    return <p>loading... </p>
  }
  return (
    <div className="w-100 bg-primary">
      <div className={containerClassName}>
        <div className="row pb-3">
          {props.content.columns.map(
            column =>
              <FooterColumn
                key={column.columnKey}
                title={t(`${column.columnKey}.title`)}
                items={column.items.map(item => {
                  return {
                    text: t(`${column.columnKey}.${item.itemKey}`),
                    ...item
                  }
                })}
                onChangeLanguage={props.onChangeLanguage}
                onNavigate={handleNavigation}
              />
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
