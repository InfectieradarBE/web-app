import React from 'react';

interface HeaderProps {
    onChangeLanguage?: (code: string) => void;
    onOpenExternalPage?: (url: string) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <p>Header</p>
    );
};

export default Header;
