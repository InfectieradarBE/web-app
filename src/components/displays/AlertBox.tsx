import React from 'react';
import TextLink from '../buttons/TextLink';
import MarkdownRenderer from './MarkdownRenderer';
import clsx from 'clsx';

interface AlertBoxProps {
    content: string;
    className?: string;
    type: 'info' | 'danger' | 'success' | 'warning';
}

const AlertBox: React.FC<AlertBoxProps> = (props) => {
    const bgClass = props.type === 'danger' ? 'bg-danger-light' : 'bg-' + props.type;
    return (
        <div className={clsx(
            "p-2",
            props.className,
            bgClass,
        )}>
            <MarkdownRenderer
                renderers={{
                    link: node => <TextLink className="text-body" {...node} />,
                }}
                markdown={props.content}
            />
        </div>
    );
};

export default AlertBox;
