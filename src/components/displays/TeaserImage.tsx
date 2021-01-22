import clsx from 'clsx';
import React from 'react';
import { getExternalOrLocalContentURL } from '../../utils/routeUtils';
import styles from './TeaserImage.module.scss';

interface TeaserImageProps {
    image: {
        url: string;
        height?: number;
        className?: string;
        backgroundPosition?: string;
    }
    textBox?: {
        className?: string;
        title?: string;
        content?: string;
    }
}

const TeaserImage: React.FC<TeaserImageProps> = (props) => {
    return (
        <div
            className={(clsx(
                styles.teaserImage,
                "d-flex align-items-center",
                props.image.className
            ))}
            style={{
                minHeight: props.image.height ? props.image.height : 367,
                backgroundImage: `url(${getExternalOrLocalContentURL(props.image.url)})`,
                backgroundPosition: props.image.backgroundPosition,
            }}
        >
            { props.textBox ? <div className="container">
                <div className="row">
                    <div className={clsx(
                        // "col-12 col-md-6 col-lg-4",
                        props.textBox.className
                    )} >
                        <div className={clsx('p-2', styles.textBox)}>
                            {props.textBox && props.textBox.title && props.textBox.title.length > 0 ? <h4>{props.textBox.title}</h4> : null}
                            {props.textBox && props.textBox.content ? <p className="m-0">{props.textBox.content}</p> : null}
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    );
};

export default TeaserImage;
