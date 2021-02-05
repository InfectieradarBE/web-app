import clsx from 'clsx';
import React from 'react';
import DialogBtn from '../../buttons/DialogBtn';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  color: 'warning';
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      title={props.title}
      onClose={props.onClose}
      ariaLabelledBy="confirmDialogTitle"
      color={props.color}
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        {props.children}
        <div className="d-flex gap-2">
          <DialogBtn
            type="button"
            color="primary"
            label={props.cancelText}
            onClick={props.onClose}
          />
          <DialogBtn
            type="button"
            label={props.confirmText}
            color={props.color}
            onClick={props.onConfirm}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
