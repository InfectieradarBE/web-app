import React from 'react';

interface PagesProps {
    onOpenExternalPage: (url: string) => void;
}

const Pages: React.FC<PagesProps> = (props) => {
    return (
        <p>Pages</p>
    );
};

export default Pages;
