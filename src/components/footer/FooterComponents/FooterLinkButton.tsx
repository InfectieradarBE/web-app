import React from 'react';
import clsx from 'clsx';
import styles from './FooterLinkButton.module.scss';

interface LinkButtonProps {
    text: string;
    iconClass?: string;
    onClick: () => void;
    external?: boolean;
}

const FooterLinkButton: React.FC<LinkButtonProps> = (props) => {
    return (
        <button
            className={clsx(
                "btn btn-link",
                "px-0",
                "text-white text-start text-decoration-none",
                "d-flex align-items-center",
                styles.footerLinkOpacity,
                styles.footerLink
            )}
            type="button"
            onClick={props.onClick}
        >
            {props.iconClass ?
                <i className={clsx(props.iconClass, 'me-1')}></i>
                : null}
            <span className={styles.text}>
                {props.text}
            </span>
            {
                props.external ?
                    <i className="ms-1 material-icons text-decoration-none" style={{ fontSize: 'inherit' }}>call_made</i> : null
            }

        </button>
    );
};

export default FooterLinkButton;
