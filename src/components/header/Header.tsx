import React from 'react';
import { HeaderConfig } from '../../types/config/header';
import SimpleHeader from './HeaderComponents/SimpleHeader';

interface HeaderProps {
    config?: HeaderConfig;
    onChangeLanguage: (code: string) => void;
    onOpenExternalPage?: (url: string) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    if (!props.config) {
        return <p>header loading... </p>
    }
    switch (props.config.layout) {
        case 'simpleLogo':
            return <SimpleHeader
                config={props.config.config}
                onChangeLanguage={props.onChangeLanguage}
                onOpenExternalPage={props.onOpenExternalPage}
            />
        default:
            return (
                <p>{`Unknown header layout: ${props.config.layout}`}</p>
            );
    }

};

export default Header;
