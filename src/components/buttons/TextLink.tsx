import React from 'react';


interface TextLinkProps {
    href?: string;
    style?: React.CSSProperties;
}

const TextLink: React.FC<TextLinkProps> = (props) => {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            role="button"
            className="d-inline-flex text-decoration-none align-items-center"
            style={props.style}
            onClick={() => window.open(props.href, 'blank')}
        >
            <span className="text-decoration-underline" >{props.children}</span>
            <i className="material-icons " style={{ fontSize: 'inherit', textDecoration: 'none' }}>call_made</i>
        </a>
    );
};

export default TextLink;
