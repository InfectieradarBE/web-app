import React from 'react';

interface NavbarProps {
    onOpenExternalPage: (url: string) => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
    return (
        <p>Navbar</p>
    );
};

export default Navbar;
