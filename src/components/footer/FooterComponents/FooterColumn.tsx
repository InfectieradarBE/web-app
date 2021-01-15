import React from 'react';
import LinkButton from '../../buttons/LinkButton';

interface FooterColumnProps {
    title: string;
    items: Array<ColumnItemDef>;
    onNavigate: (url: string, external: boolean) => void;
    onChangeLanguage: (languageCode: string) => void;
}

interface ColumnItemDef {
    itemKey: string;
    type: string;
    text: string;
    iconClass?: string;
    url?: string;
    languageCode?: string;
}

const footerColClass = 'col-12 col-sm-10 col-md-8 col-lg-4 col-xl-3 mt-3 text-white';

const FooterColumn: React.FC<FooterColumnProps> = (props) => {

    const renderItem = (item: ColumnItemDef) => {
        return <LinkButton
            key={item.itemKey}
            text={item.text}
            iconClass={item.iconClass}
            external={item.type === 'external'}
            onClick={() => {
                switch (item.type) {
                    case 'external':
                        if (!item.url) { break; }
                        props.onNavigate(item.url, true);
                        break;
                    case 'internal':
                        if (!item.url) { break; }
                        props.onNavigate(item.url, false);
                        break;
                    case 'language':
                        if (!item.languageCode) { break; }
                        props.onChangeLanguage(item.languageCode)
                        break;
                    default:
                        console.warn(`unknown item type: ${item.type}`)
                        break;
                }
            }}
        />
    }

    return (
        <div className={footerColClass}>
            <h4
                className="border-1 border-bottom pb-1"
            >{props.title}</h4>
            {props.items.map(item => renderItem(item))}
        </div>

    );
};

export default FooterColumn;
