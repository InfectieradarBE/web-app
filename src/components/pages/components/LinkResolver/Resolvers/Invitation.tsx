import React, { ChangeEvent, useEffect, useState } from 'react';
import { DefaultRoutes } from '../../../../../types/config/routing';
import { Trans, useTranslation } from 'react-i18next';
import { useLogout } from '../../../../../hooks/useLogout';
import TitleBar from '../../../../displays/TitleBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/rootReducer';
import { useUrlQuery } from '../../../../../hooks/useUrlQuery';
import { LinkResolverPaths } from '../LinkResolver';
import { useHistory } from 'react-router-dom';
import { getInfosForPasswordResetReq, resetPasswordReq, verifyContactReq } from '../../../../../api/userAPI';
import { autoValidateTemporaryTokenReq } from '../../../../../api/authAPI';
import AlertBox from '../../../../displays/AlertBox';
import { getErrorMsg } from '../../../../../api/utils';
import { closeDialog, openDialogWithoutPayload, openLoginDialog } from '../../../../../store/dialogSlice';
import TextField from '../../../../inputs/TextField';
import { checkPasswordRules } from '../../../../../utils/passwordRules';
import DialogBtn from '../../../../buttons/DialogBtn';
import Checkbox from '../../../../inputs/Checkbox';
import { useTranslatedMarkdown } from '../../../../../hooks/useTranslatedMarkdown';
import ConsentDialog from '../../../../dialogs/DialogTypes/ConsentDialog';



interface InvitationProps {
  defaultRoutes: DefaultRoutes;
}

const translationRootKey = 'invitation';

const Invitation: React.FC<InvitationProps> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["linkresolvers"]);
  const persistState = useSelector((state: RootState) => state.app.persistState);


  const [infoLoading, setInfoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [token, setToken] = useState('');
  const [wrongToken, setWrongToken] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginData, setLoginData] = useState({ accountId: '', verificationCode: '' });
  const [openPrivacyConsent, setOpenPrivacyConsent] = useState(false);
  const [acceptedPrivacyStatement, setAcceptedPrivacyStatement] = useState(false);
  const privacyConsentText = useTranslatedMarkdown('consent/privacy.md');

  const query = useUrlQuery();
  const history = useHistory();
  const logout = useLogout();

  useEffect(() => {
    const token = query.get("token");
    logout(true);
    dispatch(closeDialog());
    if (!token) {
      history.replace(props.defaultRoutes.unauth);
      return;
    }
    setToken(token);
    verifyEmail(token);
    loadInfos(token);

    let replaceUrl = LinkResolverPaths.PasswordReset;
    history.replace(replaceUrl);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPasswordMatch = (): boolean => {
    return confirmPassword === password;
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConfirmPassword(event.target.value);
  }

  const submitPasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordResetCall();
  }

  const verifyEmail = async (token: string) => {
    setLoading(true);
    if (!token) return;
    try {
      await verifyContactReq(token);
    } catch (e) {
      if (e && e.response) {
        console.error(e.response);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadInfos = async (token: string) => {
    setInfoLoading(true);
    try {
      const response = await getInfosForPasswordResetReq(token);
      const accountId = response.data.accountId;
      if (accountId) {
        setEmail(accountId);
      }
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
      setWrongToken(true);
      handleError(err);
      history.replace(props.defaultRoutes.unauth);
    } finally {
      setInfoLoading(false);
    }
  }

  const validateToken = async (token: string) => {
    setLoading(true);
    if (!token) return;
    try {
      const response = await autoValidateTemporaryTokenReq(token, '');
      if (response.status === 200) {
        setLoginData({ accountId: response.data.accountId, verificationCode: response.data.verificationCode });
      }
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const passwordResetCall = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await resetPasswordReq(token, password);
      // console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        setPassword("");
        setConfirmPassword("");
        validateToken(token);
      }
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
      handleError(e);
    } finally {
      setLoading(false);
    }
  }

  const handleError = (error?: string) => {
    switch (error) {
      case 'wrong token':
        setError(t(`${translationRootKey}.errors.wrongToken`));
        break;
      case 'token expired':
        setError(t(`${translationRootKey}.errors.wrongToken`));
        break;
      case 'wrong token purpose':
        setError(t(`${translationRootKey}.errors.wrongToken`));
        break;
      default:
        setError(t(`${translationRootKey}.errors.unknown`));
        break;
    }
  }

  const loadingContent = <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

  const resolvedContent = () => <div className="bg-grey-1 p-2" style={{ width: 500 }}>
    <form onSubmit={submitPasswordReset}>
      <AlertBox
        type="info"
        className="mb-2"
        content={t(`${translationRootKey}.content.info`)}
      />
      <AlertBox
        type="danger"
        className="mb-2"
        hide={!error}
        closable={true}
        useIcon={true}
        onClose={() => setError('')}
        content={error}
      />
      <TextField
        id="email"
        className="mb-2"
        disabled={true}
        name="email"
        value={email}
        label={t(`${translationRootKey}.content.emailLabel`)}
        placeholder={t(`${translationRootKey}.content.emailPlaceholder`)}
      />
      <TextField
        id="password"
        type="password"
        className="mb-2"
        required
        name="password"
        label={t(`${translationRootKey}.content.newPasswordLabel`)}
        placeholder={t(`${translationRootKey}.content.newPasswordPlaceholder`)}
        value={password}
        onChange={handlePasswordChange}
        hasError={!checkPasswordRules(password) && showPasswordError}
        errorMsg={t(`${translationRootKey}.errors.passwordRules`)}
        onBlur={() => {
          setShowPasswordError(true)
        }}
      />
      <TextField
        id="confirmPassword"
        type="password"
        className="mb-2"
        required
        name="confirmPassword"
        label={t(`${translationRootKey}.content.confirmPasswordLabel`)}
        placeholder={t(`${translationRootKey}.content.confirmPasswordPlaceholder`)}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        errorMsg={t(`${translationRootKey}.errors.passwordMatch`)}
        hasError={!checkPasswordMatch() && showConfirmPasswordError}
        onBlur={() => {
          setShowConfirmPasswordError(true)
        }}
      />
      <Checkbox
        className={'mb-2'}
        id="acceptPrivacyConsentInvite"
        name="privacyConsentInvite"
        checked={acceptedPrivacyStatement}
        onClick={() => {
          if (!acceptedPrivacyStatement) {
            setOpenPrivacyConsent(() => true);
          }
        }}
        onChange={(checked) => {
          if (!checked) {
            setAcceptedPrivacyStatement(checked);
          }
        }}
      >
        <Trans t={t}
          i18nKey={`${translationRootKey}.content.informedConsentCheckbox`}>
          {'...'}
          <span
            onClick={() => setOpenPrivacyConsent(() => true)}
            className="text-primary text-decoration-none">
            {'...'}
          </span>
          <span>{'...'}</span>
        </Trans>
      </Checkbox>
      <DialogBtn
        label={t(`${translationRootKey}.content.btn`)}
        type="submit"
        loading={loading}
        disabled={
          !(checkPasswordMatch()) || !checkPasswordRules(password)
          || !acceptedPrivacyStatement
        }
      />
    </form>
    {openPrivacyConsent ? <ConsentDialog
      open={openPrivacyConsent}
      title={t(`${translationRootKey}.privacyConsent.title`)}
      content={privacyConsentText.content}
      cancelBtn={t(`${translationRootKey}.privacyConsent.cancelBtn`)}
      acceptBtn={t(`${translationRootKey}.privacyConsent.acceptBtn`)}
      onCancelled={() => {
        setAcceptedPrivacyStatement(false)
        setOpenPrivacyConsent(false)
      }}
      onConfirmed={() => {
        setAcceptedPrivacyStatement(true)
        setOpenPrivacyConsent(false)
      }}
    /> : null}
  </div>

  const errorCase = () => <div className="bg-grey-1 p-2" style={{ width: 500 }}>
    <AlertBox
      type="danger"
      className="mb-2"
      hide={!error}
      useIcon={true}
      content={error}
    />
    <button className="btn btn-primary"
      onClick={() => {
        dispatch(openDialogWithoutPayload('passwordForgotten'))
      }}
    >
      {t(`${translationRootKey}.content.restartBtn`)}
    </button>
  </div>


  const successMessage = () => <div className="bg-grey-1 p-2" style={{ width: 500 }}>
    <AlertBox
      className="mb-2"
      type="success"
      content={t(`${translationRootKey}.content.successMsg`)}
    />
    <button className="btn btn-primary"
      onClick={() => {
        dispatch(openLoginDialog({
          type: 'login',
          payload: {
            email: loginData.accountId,
            password: '',
            verificationCode: loginData.verificationCode,
            rememberMe: persistState,
          }
        }));
      }}>
      {t(`${translationRootKey}.content.successBtn`)}
    </button>
  </div>

  return (
    <React.Fragment>
      <TitleBar
        content={t(`${translationRootKey}.title`)}
      />
      <div className="container">
        <div className="d-flex align-items-center my-3 justify-content-center h-100" style={{ minHeight: '60vh' }}>
          {infoLoading ? loadingContent :
            success ? successMessage() :
              wrongToken ? errorCase() : resolvedContent()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Invitation;
