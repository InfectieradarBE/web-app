import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '../Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { dialogPaddingXClass } from '../contants';
import clsx from 'clsx';
import DialogBtn from '../../buttons/DialogBtn';
import { closeDialog } from '../../../store/dialogSlice';
import AlertBox from '../../displays/AlertBox';
import TextField from '../../inputs/TextField';
import { initiatePasswordResetReq } from '../../../api/userAPI';



const PasswordForgotten: React.FC = () => {
  const { t } = useTranslation(['dialogs']);

  const dispatch = useDispatch();

  const instanceId = useSelector((state: RootState) => state.app.instanceId);
  const dialogState = useSelector((state: RootState) => state.dialog)

  const open = dialogState.config?.type === 'passwordForgotten';

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (error) {
      setDisabled(false);
    }
    setError("");
    setEmail(event.target.value);
  }

  const initPwReset = async () => {
    setLoading(true);
    try {
      const response = await initiatePasswordResetReq(instanceId, email);
      if (response.status === 200) {
        setSuccess(true);

      }
    } catch (e) {
      console.error(e);
      if (e.response && e.response.data && e.response.data.error && e.response.data.error === 'invalid account id') {
        setError(t("dialogs:passwordForgotten.errors.invalidId"));
      } else {
        setError(t("dialogs:passwordForgotten.errors.unknown"))
      }
    } finally {
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 25000);
      setLoading(false);
    }
  }

  const onResetPasswordClicked = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || disabled || email.length < 3) {
      return;
    }
    setError("");
    initPwReset();
  }

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    setDisabled(false);
    dispatch(closeDialog());
  }

  return (
    <Dialog
      open={open}
      title={t('passwordForgotten.title')}
      onClose={handleClose}
      ariaLabelledBy="passwordForgottenTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        <AlertBox
          className="mb-2"
          type="info"
          useIcon={false}
          content={t('passwordForgotten.info')}
        />
        <AlertBox
          className="mb-2"
          hide={!success}
          type="success"
          useIcon={true}
          content={t('passwordForgotten.successMessage')}
        />
        <AlertBox
          className="mb-2"
          hide={!error}
          type="danger"
          useIcon={true}
          content={error}
          closable={true}
          onClose={() => setError('')}
        />

        <form
          onSubmit={onResetPasswordClicked}>
          <TextField
            id="email"
            label={t("passwordForgotten.emailInputLabel")}
            placeholder={t("passwordForgotten.emailInputPlaceholder")}
            type="email"
            name="email"
            className={"mb-2"}
            value={email}
            required={true}
            onChange={emailChanged}
          />

          <DialogBtn
            type="submit"
            label={t('passwordForgotten.submitBtn')}
            disabled={loading || disabled || email.length < 3}
            loading={loading}
            loadingLabel={t('loadingMsg')}
          />
        </form>

      </div>
    </Dialog>
  );
};

export default PasswordForgotten;
