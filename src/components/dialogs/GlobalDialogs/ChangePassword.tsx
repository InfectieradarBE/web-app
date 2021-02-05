import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordReq } from '../../../api/userAPI';
import { getErrorMsg } from '../../../api/utils';
import { closeDialog, openAlertDialog } from '../../../store/dialogSlice';
import { RootState } from '../../../store/rootReducer';
import { checkPasswordRules } from '../../../utils/passwordRules';
import DialogBtn from '../../buttons/DialogBtn';
import AlertBox from '../../displays/AlertBox';
import TextField from '../../inputs/TextField';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';

interface ChangePasswordProps {
}

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'changePassword';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const resetState = () => {
    setError('');
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
    setShowConfirmPasswordError(false);
    setShowPasswordError(false);
    setLoading(false);
  }

  const handleClose = () => {
    resetState();
    dispatch(closeDialog());
  }

  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await changePasswordReq(formData.oldPassword, formData.newPassword);
      if (response.status === 200) {
        dispatch(openAlertDialog({
          type: 'alertDialog',
          payload: {
            color: 'success',
            title: t('changePassword.successDialog.title'),
            content: t('changePassword.successDialog.content'),
            btn: t('changePassword.successDialog.btn'),
          }
        }))
        resetState();
      }
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorMsg?: string) => {
    switch (errorMsg) {
      case 'invalid user and/or password':
        setError(t('dialogs:changePassword.errors.wrongCurrentPassword'))
        break;
      default:
        setError(t('dialogs:changePassword.errors.unknown'));
        break;
    }
  }

  const passwordsMatch = (): boolean => {
    return formData.confirmNewPassword === formData.newPassword;
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
        <form onSubmit={changePassword}>
          <TextField
            id="oldPassword"
            label={t('dialogs:changePassword.currentPasswordInputLabel')}
            placeholder={t('dialogs:changePassword.currentPasswordInputPlaceholder')}
            type="password"
            name="oldPassword"
            autoComplete="off"
            className="mb-2"
            value={formData.oldPassword}
            required={true}
            onChange={(event) => {
              const value = event.target.value;
              setFormData(prev => { return { ...prev, oldPassword: value } });
            }}

          />

          <TextField
            id="changePasswordNewPW"
            label={t('changePassword.newPasswordInputLabel')}
            placeholder={t('changePassword.newPasswordInputPlaceholder')}
            type="password"
            name="password"
            className="mb-2"
            value={formData.newPassword}
            required={true}
            hasError={!checkPasswordRules(formData.newPassword) && showPasswordError}
            errorMsg={t("dialogs:changePassword.errors.passwordRules")}
            onBlur={() => {
              setShowPasswordError(true)
            }}
            onChange={(event) => {
              const value = event.target.value;
              setFormData(prev => { return { ...prev, newPassword: value } });
            }}
          />

          <TextField
            id="changePasswordConfirmPw"
            label={t('changePassword.confirmPasswordInputLabel')}
            placeholder={t('changePassword.confirmPasswordInputPlaceholder')}
            type="password"
            name="confirmPassword"
            className="mb-2"
            value={formData.confirmNewPassword}
            required={true}
            errorMsg={t("changePassword.errors.passwordMatch")}
            hasError={!passwordsMatch() && showConfirmPasswordError}
            onBlur={() => {
              setShowConfirmPasswordError(true)
            }}
            onChange={(event) => {
              const value = event.target.value;
              setFormData(prev => { return { ...prev, confirmNewPassword: value } })
            }}
          />


          <AlertBox
            type="info"
            className="mb-2"
            content={t('changePassword.info')}
          />

          <AlertBox
            type="danger"
            className="mb-2"
            hide={!error}
            closable={true}
            onClose={() => setError('')}
            useIcon={true}
            content={error}
          />

          <div className="d-flex flex-wrap gap-2">
            <DialogBtn
              type="button"
              color="primary"
              outlined={true}
              label={t('changePassword.cancelBtn')}
              onClick={() => handleClose()}
            />
            <DialogBtn
              type="submit"
              color="primary"
              loading={loading}
              disabled={loading || formData.oldPassword.length < 6 || !checkPasswordRules(formData.newPassword) || !passwordsMatch()}
              label={t('changePassword.confirmBtn')}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ChangePassword;
