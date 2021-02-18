import React, { useEffect, useState } from 'react';
import Dialog from '../Dialog';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/rootReducer';
import { closeDialog, LoginDialog, openDialogWithoutPayload } from '../../../store/dialogSlice';
import clsx from 'clsx';
import { dialogPaddingXClass } from '../contants';
import TextField from '../../inputs/TextField';
import AlertBox from '../../displays/AlertBox';
import { useTranslation } from 'react-i18next';
import DialogBtn from '../../buttons/DialogBtn';
import Checkbox from '../../inputs/Checkbox';
import { loginWithEmailRequest, resend2FAVerificationCodeRequest } from '../../../api/authAPI';
import { setPersistState } from '../../../store/appSlice';
import { LoginResponse } from '../../../api/types/authAPI';
import { useSetAuthState } from '../../../hooks/useSetAuthState';
import { useHistory } from 'react-router-dom';
import { getErrorMsg } from '../../../api/utils';
import { useLogout } from '../../../hooks/useLogout';

const marginBottomClass = "mb-2";
const loginFormI18nPrefix = 'login.credentials';
const verificationFormI18nPrefix = 'login.verificationCode';


interface LoginProps {
}

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  verificationCode?: string;
}

interface LoginFormProps {
  isLoading: boolean;
  email: string;
  password: string;
  rememberMe: boolean;
  error: string;
  clearError: () => void;
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onOpenDialog: (dialog: 'passwordForgotten' | 'signup') => void;
}

interface VerificationCodeFormProps {
  isLoading: boolean;
  onSubmit: (code: string) => void;
  onResendVerificationCode: () => void;
  resendEnabled: boolean;
  error?: string;
  clearError: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: props.email,
    password: props.password,
    rememberMe: props.rememberMe,
  });

  useEffect(() => {
    const newData = {
      email: props.email,
      password: props.password,
      rememberMe: props.rememberMe,
    }
    setLoginData(newData);
    if (!isDisabled(newData)) {
      props.onSubmit(newData.email, newData.password, newData.rememberMe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.email, props.password])

  const isDisabled = (loginData: LoginFormData) => {
    return loginData.email.length < 3 || loginData.password.length < 6;
  }

  const rememberMeCheckbox = <Checkbox
    id="loginDialogRememberMe"
    className={marginBottomClass}
    name="rememberMe"
    checked={loginData.rememberMe}
    label={t(`${loginFormI18nPrefix}.rememberMeLabel`)}
    onChange={(checked) => {
      setLoginData(prev => {
        return {
          ...prev,
          rememberMe: checked,
        }
      })
    }}
  />

  const infoText: string = t(`${loginFormI18nPrefix}.info`);
  const emailInputLabel = t(`${loginFormI18nPrefix}.emailInputLabel`);
  const emailInputPlaceholder = t(`${loginFormI18nPrefix}.emailInputPlaceholder`);
  const passwordInputLabel = t(`${loginFormI18nPrefix}.passwordInputLabel`);
  const passwordInputPlaceholder = t(`${loginFormI18nPrefix}.passwordInputPlaceholder`);
  const loginBtn = t(`${loginFormI18nPrefix}.btn`);
  const passwordForgottenBtn = t(`${loginFormI18nPrefix}.passwordForgottenBtn`);
  const signupBtn = t(`${loginFormI18nPrefix}.signupBtn`);

  return (
    <React.Fragment>
      {infoText && infoText.length > 0 ?
        <AlertBox
          type="info"
          className={marginBottomClass}
          content={infoText}
        /> : null}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(loginData.email, loginData.password, loginData.rememberMe);
        }}
      >
        <AlertBox
          className={marginBottomClass}
          hide={!props.error}
          content={props.error ? props.error : ''}
          type="danger"
          useIcon={true}
          iconSize="2rem"
          closable={true}
          onClose={() => props.clearError()}
        />
        <TextField
          id="loginDialogEmail"
          label={emailInputLabel}
          placeholder={emailInputPlaceholder}
          type="email"
          name="email"
          className={marginBottomClass}
          value={loginData.email}
          required={true}
          autoComplete="email"
          onChange={(event) => {
            const value = event.target.value;
            setLoginData(prev => { return { ...prev, email: value } })
          }}
        />
        <TextField
          id="loginDialogPassword"
          label={passwordInputLabel}
          placeholder={passwordInputPlaceholder}
          type="password"
          name="password"
          className={marginBottomClass}
          value={loginData.password}
          required={true}
          disabled={false}
          autoComplete="off"
          onChange={(event) => {
            const value = event.target.value;
            setLoginData(prev => { return { ...prev, password: value } })
          }}
        />
        {rememberMeCheckbox}
        <div className={marginBottomClass}>
          <DialogBtn
            type="submit"
            label={loginBtn}
            disabled={isDisabled(loginData) || props.isLoading}
            loading={props.isLoading}
            loadingLabel={t('loadingMsg')}
          />
        </div>
        <div className={marginBottomClass}>
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none text-start text-uppercase"
            onClick={(event) => {
              event.preventDefault();
              props.onOpenDialog('passwordForgotten');
            }}
          >{passwordForgottenBtn}</button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none text-start text-uppercase"
            onClick={(event) => {
              event.preventDefault();
              props.onOpenDialog('signup');
            }}
          >{signupBtn}</button>
        </div>
      </form>
    </React.Fragment>
  )
}

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = (props) => {
  const [verificationCode, setVerificationCode] = useState("");
  const { t } = useTranslation(['dialogs']);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(verificationCode);
  }

  const submitButtonEnabled = () => {
    return !props.isLoading && verificationCode.length === 6;
  }

  const submitBtnLabel = t(`${verificationFormI18nPrefix}.submitBtn`)
  const resendBtnLabel = t(`${verificationFormI18nPrefix}.resendBtn`)
  const infoText: string = t(`${verificationFormI18nPrefix}.info`);
  const codeInputLabel = t(`${verificationFormI18nPrefix}.codeInputLabel`);
  const codeInputPlaceholder = t(`${verificationFormI18nPrefix}.codeInputPlaceholder`);

  return (
    <form noValidate={true} onSubmit={onSubmit}>
      <AlertBox
        className={marginBottomClass}
        hide={!props.error}
        content={props.error ? props.error : ''}
        type="danger"
        useIcon={true}
        iconSize="2rem"
        closable={true}
        onClose={() => props.clearError()}
      />
      <TextField
        id="twoFACode"
        label={codeInputLabel}
        placeholder={codeInputPlaceholder}
        type="text"
        name="twoFACode"
        className={marginBottomClass}
        value={verificationCode}
        required={true}
        disabled={false}
        autoComplete="off"
        onChange={(event) => {
          const value = event.target.value;
          setVerificationCode(value);
        }}
      />

      <DialogBtn
        className={marginBottomClass}
        type="submit"
        label={submitBtnLabel}
        disabled={!submitButtonEnabled()}
        loading={props.isLoading}
        loadingLabel={t('loadingMsg')}
      />

      {infoText ? <AlertBox
        className={marginBottomClass}
        type="info"
        content={infoText}
      /> : null}


      <div>
        <button
          type="button"
          disabled={!props.resendEnabled}
          className="btn btn-link p-0 text-decoration-none text-start text-uppercase"
          onClick={(event) => {
            event.preventDefault();
            props.onResendVerificationCode();
          }}
        >{resendBtnLabel}</button>
      </div>
    </form>
  )
}


/**
 * Login Dialog with logic to handle callbacks from the forms
 * @param props
 */
const Login: React.FC<LoginProps> = (props) => {
  const instanceId = useSelector((state: RootState) => state.config.instanceId);
  const persistState = useSelector((state: RootState) => state.app.persistState);
  const dialogState = useSelector((state: RootState) => state.dialog)

  const open = dialogState.config?.type === 'login';
  const initialLoginData = open ? (dialogState.config as LoginDialog).payload : undefined;

  const setAuthState = useSetAuthState();
  const logout = useLogout();
  const history = useHistory();

  const [verificationStep, setVerificationStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendEnabled, setResetEnabled] = useState(false);

  const [emailAddress, setEmailAddress] = useState<string>(initialLoginData ? initialLoginData.email : "");
  const [password, setPassword] = useState<string>(initialLoginData ? initialLoginData.password : "");
  const [verificationCode, setVerificationCode] = useState<string>(initialLoginData && initialLoginData.verificationCode ? initialLoginData.verificationCode : "");

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation(['dialogs']);

  useEffect(() => {
    setResetEnabled(false);
    if (open && initialLoginData) {
      setEmailAddress(initialLoginData.email);
      setPassword(initialLoginData.password);
      setVerificationCode(initialLoginData.verificationCode ? initialLoginData.verificationCode : '');
      dispatch(setPersistState(initialLoginData.rememberMe));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialLoginData]);

  useEffect(() => {
    if (loading) {
      setResetEnabled(false);
    } else {
      if (verificationStep) {
        setTimeout(() => {
          setResetEnabled(true);
        }, 20000);
      }
    }
  }, [loading, open, verificationStep])

  const setAuthFields = (email: string, password: string, rememberMe: boolean) => {
    setEmailAddress(email);
    setPassword(password);
    setErrorMessage('');
    dispatch(setPersistState(rememberMe));
  }

  const handleClose = () => {
    setEmailAddress("");
    setPassword("");
    setErrorMessage('');
    setVerificationCode('');
    setVerificationStep(false);
    dispatch(closeDialog())
  }

  const login = async (creds: LoginFormData) => {
    if (loading) return;
    setAuthFields(creds.email, creds.password, creds.rememberMe);
    setLoading(true);
    logout(true);

    try {
      const resp = await loginWithEmailRequest({
        email: creds.email,
        password: creds.password,
        instanceId: instanceId,
        verificationCode: creds.verificationCode,
      });
      const response = resp.data as LoginResponse;
      if (response.secondFactorNeeded) {
        setVerificationStep(true);
      } else {
        response.user.account.accountConfirmedAt = +response.user.account.accountConfirmedAt
        setAuthState(response.token, response.user);


        const currentLangauge = i18n.language;
        if (response.user.account.preferredLanguage && response.user.account.preferredLanguage !== currentLangauge) {
          i18n.changeLanguage(response.user.account.preferredLanguage);
        }

        if (!response.user.account.accountConfirmedAt || response.user.account.accountConfirmedAt <= 0) {
          dispatch(openDialogWithoutPayload('signupSuccess'));
        }
        if (history) {
          history.push('/');
        }
        handleClose();
      }
    } catch (e) {
      const errMsg = getErrorMsg(e);
      console.error(errMsg);
      handleError(errMsg);
    } finally {
      setLoading(false);
    }
  }

  const resendCode = async () => {
    setLoading(true);
    try {
      await resend2FAVerificationCodeRequest({
        email: emailAddress,
        password: password,
        instanceId: instanceId,
      });
      console.log("success sending new code");
    } catch (err) {
      const errMsg = getErrorMsg(err);
      console.error(errMsg);
      handleError(errMsg);
    } finally {
      setLoading(false);
    }

  }

  const handleError = (errorResponse?: string) => {
    let error: string;
    switch (errorResponse) {
      case 'invalid username and/or password':
        error = t('dialogs:login.errors.accountOrPassword');
        break;
      case 'wrong verfication code':
        error = t('dialogs:login.errors.wrongCode');
        break;
      case 'new verfication code':
        error = t('login.errors.newCodeSent');
        break;
      case 'cannot generate verification code so often':
        error = t('login.errors.rateLimit');
        break;
      default:
        error = t('login.errors.unknown');
        break;
    }
    setErrorMessage(error);
  }

  return (
    <Dialog
      open={open}
      title={
        verificationStep ? t(`${verificationFormI18nPrefix}.title`) : t(`${loginFormI18nPrefix}.title`)
      }
      onClose={handleClose}
      ariaLabelledBy="loginDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        {verificationStep ?
          <VerificationCodeForm
            isLoading={loading}
            onSubmit={(code) => {
              login({
                email: emailAddress,
                password: password,
                rememberMe: persistState,
                verificationCode: code
              })
            }}
            onResendVerificationCode={() => {
              if (!resendEnabled) {
                console.log('resend not enabled, please wait');
                return;
              }
              resendCode();
            }}
            resendEnabled={!loading && resendEnabled}
            error={errorMessage}
            clearError={() => setErrorMessage('')}
          /> :
          <LoginForm
            isLoading={loading}
            email={emailAddress}
            password={password}
            rememberMe={persistState}
            error={errorMessage}
            clearError={() => setErrorMessage('')}
            onSubmit={(email, password, rememberMe) => {
              login({
                email: email,
                password: password,
                rememberMe: rememberMe,
                verificationCode: verificationCode,
              })
            }}
            onOpenDialog={(dialog) => {
              handleClose();
              dispatch(openDialogWithoutPayload(dialog));
            }}
          />
        }
      </div>
    </Dialog>
  );
};

export default Login;
