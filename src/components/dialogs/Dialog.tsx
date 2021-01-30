import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
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
  const fullScreen = useMediaQuery('(max-width:600px)');

  const isTextColorWhite = ['primary', 'danger'].includes(color);
  return (
    <MuiDialog onClose={props.onClose}
      aria-labelledby={props.ariaLabelledBy}
      open={props.open}
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          borderRadius: 0,
          width: 450,
          maxWidth: 600,
        }
      }}
      classes={{
        paper: 'd-flex flex-column',
        // paperFullScreen: ,
      }}
    >
      <div className={clsx(
        dialogPaddingXClass,
        dialogHeaderPaddingYClass,
        'd-flex align-items-center',
        `bg-${color}`,
        {
          'position-fixed w-100': fullScreen
        }
      )}
        style={{
          minHeight: 75
        }}
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
      <div className="flex-grow-1 bg-grey-1 pt-4 mt-3 mt-sm-0 pt-sm-0">
        {props.children}
      </div>
    </MuiDialog>
  );
};

export default Dialog;
