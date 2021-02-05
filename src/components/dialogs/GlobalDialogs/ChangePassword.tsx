import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../store/dialogSlice';
import { RootState } from '../../../store/rootReducer';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';

interface ChangePasswordProps {
}

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'changePassword';
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setError('');
    setLoading(false);
    dispatch(closeDialog());
  }

  return (
    <Dialog
      open={open}
      title={t('changePassword.title')}
      onClose={handleClose}
      ariaLabelledBy="changePasswordDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        {'todo'}
      </div>
    </Dialog>
  );
};

export default ChangePassword;
