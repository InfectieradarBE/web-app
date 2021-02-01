import React, { ChangeEvent, useEffect, useState } from 'react';
import { DefaultRoutes } from '../../../../../types/config/routing';
import { useTranslation } from 'react-i18next';
import { useAuthTokenCheck } from '../../../../../hooks/useAuthTokenCheck';
import { useIsAuthenticated } from '../../../../../hooks/useIsAuthenticated';
import { useLogout } from '../../../../../hooks/useLogout';
import TitleBar from '../../../../displays/TitleBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/rootReducer';
import { useUrlQuery } from '../../../../../hooks/useUrlQuery';
import { LinkResolverPaths } from '../LinkResolver';
import { useHistory } from 'react-router-dom';
import { getUserReq, verifyContactReq } from '../../../../../api/userAPI';
import { autoValidateTemporaryTokenReq } from '../../../../../api/authAPI';
import { renewToken } from '../../../../../api/instances/authenticatedApi';
import { userActions } from '../../../../../store/userSlice';
import AlertBox from '../../../../displays/AlertBox';
import { getErrorMsg } from '../../../../../api/utils';
import { closeDialog, openLoginDialog } from '../../../../../store/dialogSlice';
import TextField from '../../../../inputs/TextField';
import { checkPasswordRules } from '../../../../../utils/passwordRules';
import DialogBtn from '../../../../buttons/DialogBtn';


interface PasswordResetProps {
  defaultRoutes: DefaultRoutes;
}

const translationRootKey = 'passwordReset';

const PasswordReset: React.FC<PasswordResetProps> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["linkresolvers"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

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

    let replaceUrl = LinkResolverPaths.ContactVerification;
    // history.replace(replaceUrl);
    console.warn('todo: replace url')


    /*
    dispatch(

      navigationActions.openResetPasswordDialog({ token: token, type: "reset" }));
    history.push(AppRoutes.Home);*/
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

  const loadingContent = <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

  const resolvedContent = <div className="bg-grey-1 p-2" style={{ width: 500 }}>
    <form onSubmit={(event) => event.preventDefault()}>
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
        value={'todo'}
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

      <DialogBtn
        label={t(`${translationRootKey}.content.btn`)}
        type="submit"
        disabled={!checkPasswordMatch() || !checkPasswordRules(password) || loading}
      />
    </form>
  </div>


  return (
    <React.Fragment>
      <TitleBar
        content={t(`${translationRootKey}.title`)}
      />
      <div className="container">
        <div className="d-flex align-items-center my-3 justify-content-center h-100" style={{ minHeight: '60vh' }}>
          {loading ? loadingContent : resolvedContent}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PasswordReset;
