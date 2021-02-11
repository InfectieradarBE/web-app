import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import clsx from 'clsx';
import { dialogHeaderPaddingYClass, dialogPaddingXClass } from './contants';


interface DialogProps {
  open: boolean;
  title: string;
  color?: 'primary' | 'danger' | 'warning' | 'success';
  preferredWidth?: number;
  onClose: () => void;
  ariaLabelledBy: string;
  ariaDescribedBy?: string;
}

const fullScreenBreakPoint = 576;
const defaultWidth = 450;

const Dialog: React.FC<DialogProps> = (props) => {
  const color = props.color ? props.color : 'primary';
  const fullScreen = useMediaQuery(`(max-width:${fullScreenBreakPoint}px)`);

  const isTextColorWhite = ['primary', 'danger'].includes(color);

  const headerContent = (useButtonPlaceholder?: boolean) => <React.Fragment>
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
      {!useButtonPlaceholder ?
        <button type="button"
          onClick={props.onClose}
          className={clsx(
            "btn-close",
            {
              "btn-close-white": isTextColorWhite
            }
          )} aria-label="Exit"></button> :
        <div style={{ width: 24 }}></div>
      }
    </div>
  </React.Fragment>

  const dialogHeader = <React.Fragment>
    <div className={clsx(
      dialogPaddingXClass,
      dialogHeaderPaddingYClass,
      'd-flex align-items-center',
      `bg-${color}`,
      {
        'position-fixed w-100': fullScreen
      }
    )}
    >
      {headerContent()}
    </div>

    {/** For accounting header height in fullscreen mode: */}
    <div
      className={clsx(
        dialogPaddingXClass,
        dialogHeaderPaddingYClass,
        'd-flex align-items-center',
        {
          'd-block': fullScreen,
          'd-none': !fullScreen
        }
      )}
      aria-hidden="true"
    >
      {headerContent(true)}
    </div>
  </React.Fragment>


  return (
    <MuiDialog onClose={props.onClose}
      aria-labelledby={props.ariaLabelledBy}
      open={props.open}
      fullScreen={fullScreen}
      scroll='paper'
      PaperProps={{
        style: {
          borderRadius: 0,
          width: fullScreen ? fullScreenBreakPoint : props.preferredWidth ? props.preferredWidth : defaultWidth,
          maxWidth: fullScreenBreakPoint,
        }
      }}
      classes={{
        paper: 'd-flex flex-column',
        // paperFullScreen: ,
      }}
    >
      {dialogHeader}
      <div className="flex-grow-1 bg-grey-1">
        {props.children}
      </div>
    </MuiDialog>
  );
};

export default Dialog;
