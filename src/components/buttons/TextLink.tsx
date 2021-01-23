import React from 'react';
import clsx from 'clsx';

interface TextLinkProps {
    href?: string;
    className?: string;
    style?: React.CSSProperties;
}

const TextLink: React.FC<TextLinkProps> = (props) => {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            role="button"
            className={
                clsx("d-inline-flex text-decoration-none align-items-center",
                    props.className
                )}
            style={props.style}
            onClick={() => window.open(props.href, 'blank')}
        >
            <span className="text-decoration-underline" >{props.children}</span>
            <i className="material-icons " style={{ fontSize: 'inherit', textDecoration: 'none' }}>call_made</i>
        </a>
    );
};

export default TextLink;
