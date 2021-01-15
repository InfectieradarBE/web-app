import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterContentConfig } from '../../types/config/footerContent';
import FooterColumn from './FooterComponents/FooterColumn';

interface FooterProps {
    loading?: boolean;
    content?: FooterContentConfig;
    onChangeLanguage: (code: string) => void;
    onNavigate: (url: string, external: boolean) => void;
}

const Footer: React.FC<FooterProps> = (props) => {
    const { t } = useTranslation(['footer']);

    if (props.loading || !props.content) {
        return <p>loading... </p>
    }
    return (
        <div className="w-100 bg-primary">
            <div className="container">
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
                                onNavigate={props.onNavigate}
                            />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Footer;
