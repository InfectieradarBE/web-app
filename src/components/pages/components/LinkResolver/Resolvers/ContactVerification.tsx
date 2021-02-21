import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthTokenCheck } from '../../../../../hooks/useAuthTokenCheck';
import { useIsAuthenticated } from '../../../../../hooks/useIsAuthenticated';
import { useLogout } from '../../../../../hooks/useLogout';
import { DefaultRoutes } from '../../../../../types/config/routing';
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
import { openLoginDialog } from '../../../../../store/dialogSlice';
import { containerClassName } from '../../../../../constants';

interface ContactVerificationProps {
  defaultRoutes: DefaultRoutes;
}

const translationRootKey = 'verifyEmail';

const ContactVerification: React.FC<ContactVerificationProps> = (props) => {
  const { t } = useTranslation(["linkresolvers"]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const query = useUrlQuery();

  const isLoggedIn = useIsAuthenticated();
  const hasToken = useAuthTokenCheck();
  const dispatch = useDispatch();
  const logout = useLogout();

  const logedInUser = useSelector((state: RootState) => state.user.currentUser.account.accountId);
  const persistState = useSelector((state: RootState) => state.app.persistState);

  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ accountId: '', verificationCode: '' });

  useEffect(() => {
    const token = query.get("token");
    let replaceUrl = LinkResolverPaths.ContactVerification;
    history.replace(replaceUrl);
    verifyEmail(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyEmail = async (token: string | null) => {
    if (loading || !token) return;
    setLoading(true);
    try {
      const response = await verifyContactReq(token);
      if (response.status === 200) {
        if (hasToken) {
          if (logedInUser !== response.data.account.accountId) {
            logout(true);
            validateToken(token);
          } else {
            await renewToken();
            const userResponse = await getUserReq();
            if (userResponse.data) {
              dispatch(userActions.setUser(response.data));
            }
          }
        } else {
          validateToken(token);
        }
      }
      setLoading(false);
    } catch (e) {
      console.error(e.response);
      handleError(e.response.data.error);
      if (isLoggedIn) {
        logout(true);
      }
      validateToken(token);
      setLoading(false);
    }
  };

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

  const handleError = (error?: string) => {
    switch (error) {
      case 'no user found':
        setError(t(`${translationRootKey}.errors.wrongToken`));
        break;
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
        setError(t(`${translationRootKey}.errors.wrongToken`));
        break;
    }
  }

  const loadingContent = <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

  const infoText = t(`${translationRootKey}.content.info`);
  const successText = t(`${translationRootKey}.content.success`);

  const resolvedContent = <div className="bg-grey-1 p-2" style={{ width: 500 }}>
    {infoText ? <AlertBox
      className="mb-2"
      type="info"
      content={infoText}
    /> : null}

    <AlertBox
      className="mb-2"
      type="success"
      hide={error.length > 0}
      content={successText}
    />

    <AlertBox
      className="mb-2"
      type="danger"
      hide={!error}
      useIcon={true}
      content={error}
    />
    <div className="">
      <button className="btn btn-primary"
        onClick={() => {
          if (isLoggedIn) {
            history.replace(props.defaultRoutes.auth);
          } else {
            dispatch(openLoginDialog({
              payload: {
                email: loginData.accountId,
                password: '',
                verificationCode: loginData.verificationCode,
                rememberMe: persistState,
              },
              type: 'login',
            }));
          }
        }}
      >
        {!error ? t(`${translationRootKey}.content.btn.successWith${isLoggedIn ? 'Auth' : 'outAuth'}`)
          : t(`${translationRootKey}.content.btn.errorWith${isLoggedIn ? 'Auth' : 'outAuth'}`)}
      </button>
    </div>
  </div>


  return (
    <React.Fragment>
      <TitleBar
        content={t(`${translationRootKey}.title`)}
      />
      <div className={containerClassName}>
        <div className="d-flex align-items-center my-3 justify-content-center h-100" style={{ minHeight: '60vh' }}>
          {loading ? loadingContent : resolvedContent}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactVerification;
