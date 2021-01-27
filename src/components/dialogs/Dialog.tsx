import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';


interface DialogProps {
  open: boolean;
  onClose: () => void;
  ariaLabelledBy: string;
  ariaDescribedBy?: string;
}

const Dialog: React.FC<DialogProps> = (props) => {

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
      {props.children}
    </MuiDialog>
  );
};

export default Dialog;
