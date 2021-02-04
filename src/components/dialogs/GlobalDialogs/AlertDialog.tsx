import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertDialog as AlertDialogInt, closeDialog } from '../../../store/dialogSlice';
import { RootState } from '../../../store/rootReducer';
import DialogBtn from '../../buttons/DialogBtn';
import AlertBox from '../../displays/AlertBox';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';

interface AlertDialogProps {
}

const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'alertDialog';

  const dialogContent = open ? (dialogState.config as AlertDialogInt).payload : undefined;

  const handleClose = () => {
    dispatch(closeDialog());
  }

  if (!dialogContent) {
    return null;
  }

  return (
    <Dialog
      open={open}
      title={dialogContent.title}
      onClose={handleClose}
      ariaLabelledBy="signupDialogTitle"
      color={dialogContent.color}
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        <AlertBox
          className="mb-2"
          type={dialogContent.color}
          useIcon={false}
          content={dialogContent.content}
        />
        <DialogBtn
          type="button"
          label={dialogContent.btn}
          onClick={handleClose}
        />
      </div>
    </Dialog>
  );
};

export default AlertDialog;
