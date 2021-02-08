import React from 'react';
import TextLink from '../buttons/TextLink';
import MarkdownRenderer from './MarkdownRenderer';
import clsx from 'clsx';

import styles from './AlertBox.module.scss';

interface AlertBoxProps {
  content: string;
  className?: string;
  hide?: boolean;
  type: 'info' | 'danger' | 'success' | 'warning';
  pxClass?: string;
  pyClass?: string;
  useIcon?: boolean;
  iconSize?: string;
  closable?: boolean;
  onClose?: () => void;
}

const AlertBox: React.FC<AlertBoxProps> = (props) => {
  const bgClass = `bg-${props.type}${['danger', 'warning', 'success'].includes(props.type) ? '-light' : ''}`
  const px = props.pxClass ? props.pxClass : 'px-2';
  const py = props.pyClass ? props.pyClass : 'py-2';

  const getIcon = () => {
    switch (props.type) {
      case 'danger':
        return <i
          className="material-icons text-danger"
          style={{ fontSize: props.iconSize ? props.iconSize : '1.5rem' }}
        >cancel</i>
      case 'success':
        return <i
          className="material-icons text-success"
          style={{ fontSize: props.iconSize ? props.iconSize : '1.5rem' }}
        >check_box</i>
      case 'warning':
        return <i
          className="material-icons text-warning"
          style={{ fontSize: props.iconSize ? props.iconSize : '1.5rem' }}
        >warning</i>
      default:
        return null;
    }
  }

  return (
    <div className={clsx(styles['animated-box'],
      {
        [styles.animatedBoxOpen]: !props.hide,
      })}>
      <div className={clsx(
        "d-flex align-items-center",
        px,
        py,
        props.className,
        bgClass,
      )}
        role="alert"
      >
        {props.useIcon ?
          <div className="me-2 d-flex align-items-center align-self-center">
            {
              getIcon()
            }
          </div>
          : null}
        <MarkdownRenderer
          className="p-0 flex-grow-1"
          renderers={{
            link: node => <TextLink className="text-body" {...node} />,
          }}
          markdown={props.content}
        />
        {props.closable ?
          <button type="button"
            onClick={props.onClose}
            className={clsx(
              "ms-1 btn-close",
              {
                // "btn-close-white": isTextColorWhite
              }
            )} aria-label="Exit"></button>
          : null}
      </div >
    </div>
  );
};

export default AlertBox;
