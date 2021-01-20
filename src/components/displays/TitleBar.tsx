import React from 'react';

interface TitleBarProps {
    content?: string;
}

const TitleBar: React.FC<TitleBarProps> = (props) => {
    if (!props.content) {
        return null;
    }
    return (
        <div className="bg-secondary">
            <div className="container py-1">
                <h1 className="m-0">{props.content}</h1>
            </div>
        </div>

    );
};

export default TitleBar;
