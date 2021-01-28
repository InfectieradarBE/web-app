import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import { dialogHeaderPaddingYClass, dialogPaddingXClass } from './contants';


interface DialogProps {
  open: boolean;
  title: string;
  color?: 'primary' | 'danger' | 'warning' | 'success';
  onClose: () => void;
  ariaLabelledBy: string;
  ariaDescribedBy?: string;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const color = props.color ? props.color : 'primary';

  const isTextColorWhite = ['primary', 'danger'].includes(color);
  return (
    <MuiDialog onClose={props.onClose}
      aria-labelledby={props.ariaLabelledBy}
      open={props.open}
      // fullScreen={true}
      PaperProps={{
        style: {
          borderRadius: 0
        }
      }}
    >
      <div className={clsx(
        dialogPaddingXClass,
        dialogHeaderPaddingYClass,
        'd-flex align-items-center',
        `bg-${color}`,
      )}
      >
        <h4 id={props.ariaLabelledBy}
          className={clsx(
            'flex-grow-1 m-0 fw-bold',
            {
              'text-white': isTextColorWhite
            }
          )}
        >
          {props.title}
        </h4>
        <div className="ps-2">
          <button type="button"
            onClick={props.onClose}
            className={clsx(
              "btn-close",
              {
                "btn-close-white": isTextColorWhite
              }
            )} aria-label="Exit"></button>
        </div>
      </div>
      {props.children}
    </MuiDialog>
  );
};

export default Dialog;
