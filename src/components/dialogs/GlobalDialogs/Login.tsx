import React, { useEffect, useState } from 'react';
import Dialog from '../Dialog';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/rootReducer';
import { closeDialog, DialogState, LoginDialog, openDialogWithoutPayload } from '../../../store/dialogSlice';
import clsx from 'clsx';
import { dialogPaddingXClass } from '../contants';
import TextField from '../../inputs/TextField';
import AlertBox from '../../displays/AlertBox';
import { useTranslation } from 'react-i18next';
import DialogBtn from '../../buttons/DialogBtn';
import Checkbox from '../../inputs/Checkbox';

const marginBottomClass = "mb-2";
const loginFormI18nPrefix = 'login.credentials';
const verificationFormI18nPrefix = 'login.verificationCode';

interface LoginProps {
}

interface LoginData {
  email: string,
  password: string,
  rememberMe: boolean,
}

interface LoginFormProps {
  isLoading: boolean;
  loginData: LoginData;
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onOpenDialog: (dialog: 'passwordForgotten' | 'signup') => void;
}

interface VerificationCodeFormProps {
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const [loginData, setLoginData] = useState(props.loginData);

  useEffect(() => {
    setLoginData({ ...props.loginData });
    if (!isDisabled(props.loginData)) {
      props.onSubmit(props.loginData.email, props.loginData.password, props.loginData.rememberMe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loginData])

  const isDisabled = (loginData: LoginData) => {
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

  return (<p>todo</p>)
}

const getInitialLoginData = (dialogState: DialogState) => {
  const payload = (dialogState as LoginDialog).payload;

  if (!payload) {
    return undefined;
  }
  return { ...payload };
}

/**
 * Login Dialog with logic to handle callbacks from the forms
 * @param props
 */
const Login: React.FC<LoginProps> = (props) => {
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'login';

  const initialLoginData = open ? (dialogState.config as LoginDialog).payload : undefined;


  const [verificationStep, setVerificationStep] = useState(false);
  const [loginData, setLoginData] = useState<LoginData | undefined>(open ? getInitialLoginData(dialogState) : undefined);
  const dispatch = useDispatch();

  const { t } = useTranslation(['dialogs']);

  const handleClose = () => {
    dispatch(closeDialog())
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
        'bg-secondary'
      )}>
        {verificationStep ?
          <VerificationCodeForm /> :
          <LoginForm
            isLoading={true}
            loginData={initialLoginData ? initialLoginData : {
              email: '',
              password: '',
              rememberMe: true
            }}
            onSubmit={(loginData) => console.log(loginData)}
            onOpenDialog={(dialog) => {
              dispatch(openDialogWithoutPayload(dialog));
            }}
          />
        }
      </div>
    </Dialog>
  );
};

export default Login;
