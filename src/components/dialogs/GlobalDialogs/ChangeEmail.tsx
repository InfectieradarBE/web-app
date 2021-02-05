import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { renewToken } from '../../../api/instances/authenticatedApi';
import { changeAccountEmailReq } from '../../../api/userAPI';
import { closeDialog, openAlertDialog } from '../../../store/dialogSlice';
import { RootState } from '../../../store/rootReducer';
import { userActions } from '../../../store/userSlice';
import DialogBtn from '../../buttons/DialogBtn';
import AlertBox from '../../displays/AlertBox';
import TextField from '../../inputs/TextField';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';
import ConfirmDialog from '../DialogTypes/ConfirmDialog';

interface ChangeEmailProps {
}

const ChangeEmail: React.FC<ChangeEmailProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'changeEmail';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState({
    newEmail: '',
    password: '',
  });

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open])

  const resetForm = () => {
    setLoading(false);
    setError('');
    setFormData({
      newEmail: '',
      password: '',
    });
  }

  const handleClose = () => {
    dispatch(closeDialog());
  }

  const changeEmail = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await changeAccountEmailReq(formData.newEmail, false, formData.password);
      if (response.status === 200) {
        renewToken();
        if (response.data) {
          dispatch(userActions.setUser(response.data));
        }
        dispatch(openAlertDialog({
          type: 'alertDialog',
          payload: {
            color: 'success',
            title: t('changeEmail.successDialog.title'),
            content: t('changeEmail.successDialog.content'),
            btn: t('changeEmail.successDialog.btn'),
          }
        }))
      }
    } catch (e) {
      console.error(e.response);
      handleError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorMsg?: string) => {
    switch (errorMsg) {
      case 'action failed':
        setError(t('changeEmail.errors.wrongPasswordOrAccountId'));
        break;
      case 'email not valid':
        setError(t('changeEmail.errors.wrongEmailFormat'));
        break;
      default:
        setError(t('changeEmail.errors.unknown'));
        break;
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpenConfirm(true);
  };

  const buttonDisabled = (): boolean => {
    return loading || formData.newEmail.length < 1 || formData.password.length < 6;
  }


  return (
    <Dialog
      open={open}
      title={t('changeEmail.title')}
      onClose={handleClose}
      ariaLabelledBy="changeEmailDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        <form onSubmit={onSubmit}>
          <TextField
            className="mb-2"
            id="newEmail"
            name="newEmail"
            type="email"
            label={t('dialogs:changeEmail.emailInputLabel')}
            placeholder={t('dialogs:changeEmail.emailInputPlaceholder')}
            value={formData.newEmail}
            autoFocus
            autoComplete="off"
            onChange={(event) => {
              const value = event.target.value;
              setFormData(prev => { return { ...prev, newEmail: value } });
            }}
          />
          <TextField
            className="mb-2"
            id="password"
            name="password"
            type="password"
            label={t('changeEmail.passwordInputLabel')}
            placeholder={t('changeEmail.passwordInputPlaceholder')}
            value={formData.password}
            autoComplete="off"
            onChange={(event) => {
              const value = event.target.value;
              setFormData(prev => { return { ...prev, password: value } });
            }}
          />

          <AlertBox
            type="info"
            className="mb-2"
            content={t('changeEmail.info')}
          />

          <AlertBox
            type="danger"
            className="mb-2"
            hide={!error}
            closable={true}
            useIcon={true}
            onClose={() => setError("")}
            content={error}
          />

          <div className="d-flex flex-wrap gap-2">
            <DialogBtn
              type="button"
              color="primary"
              outlined={true}
              label={t('changeEmail.cancelBtn')}
              onClick={() => handleClose()}
            />
            <DialogBtn
              type="submit"
              color="primary"
              loading={loading}
              disabled={buttonDisabled()}
              label={t('changeEmail.confirmBtn')}
            />
          </div>
        </form>
      </div>
      {
        <ConfirmDialog
          open={openConfirm}
          title={t('changeEmail.warningDialog.title')}
          onConfirm={() => {
            setOpenConfirm(false);
            changeEmail();
          }}
          color="warning"
          onClose={() => setOpenConfirm(false)}
          cancelText={t('changeEmail.warningDialog.cancelBtn')}
          confirmText={t('changeEmail.warningDialog.confirmBtn')}
        >
          <AlertBox
            type="warning"
            className="mb-2"
            content={t('changeEmail.warningDialog.content')}
          />
        </ConfirmDialog>
      }
    </Dialog>
  );
};

export default ChangeEmail;
