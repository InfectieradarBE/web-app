import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultRoutes } from '../../../../types/config/routing';
import { useUrlQuery } from '../../../../hooks/useUrlQuery';
import { verifyContactReq } from '../../../../api/userAPI';
import { useAuthTokenCheck } from '../../../../hooks/useAuthTokenCheck';
import { RootState } from '../../../../store/rootReducer';
import { useLogout } from '../../../../hooks/useLogout';
import TitleBar from '../../../displays/TitleBar';
import { useTranslation } from 'react-i18next';
import AlertBox from '../../../displays/AlertBox';
import { useIsAuthenticated } from '../../../../hooks/useIsAuthenticated';


export const linkResolverRootUrl = '/link';

export const LinkResolverPaths = {
  ContactVerification: `${linkResolverRootUrl}/verify-contact`,
  PasswordReset: `${linkResolverRootUrl}/password-reset`,
  StudyLogin: `${linkResolverRootUrl}/study-login`,
  Invitation: `${linkResolverRootUrl}/invitation`,
}

interface LinkResolverProps {
  defaultRoutes: DefaultRoutes;
}


const LinkResolver: React.FC<LinkResolverProps> = (props) => {
  const query = useUrlQuery();
  const location = useLocation();
  const history = useHistory();
  const hasToken = useAuthTokenCheck();
  const isLoggedIn = useIsAuthenticated();

  const dispatch = useDispatch();
  const logedInUser = useSelector((state: RootState) => state.user.currentUser.account.accountId);
  const logout = useLogout();
  const { t } = useTranslation(["linkresolvers"]);

  const [translationKey, setTranslationKey] = useState('');
  const [errorKey, setErrorKey] = useState('');
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const type = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    console.log(type)
    const token = query.get("token");
    let replaceUrl = linkResolverRootUrl;

    switch (type) {
      case 'verify-contact':
        setTranslationKey('verifyEmail');
        verifyEmail(token).then(
          success => {
            setLoading(false);
            if (success) {
              console.warn('handle dialog openning');
              // TODO: dispatch(navigationActions.openResetPasswordDialog({ token: token, type: "invite" }));
              // history.replace(hasToken ? props.defaultRoutes.auth : props.defaultRoutes.unauth);
            }
          }
        );
        break;
      default:
        console.log('nav to home')
        replaceUrl = hasToken ? props.defaultRoutes.auth : props.defaultRoutes.unauth;
        break;
    }

    history.replace(replaceUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const verifyEmail = async (token: string | null): Promise<boolean> => {
    if (!token) {
      // TODO: handle error:
      console.error('no token - handle error');
      return false;
    }
    try {
      const response = await verifyContactReq(token);
      if (response.status === 200) {
        console.log(response.data);
        if (hasToken && logedInUser !== response.data.account.accountId) {
          logout();
        }
        return true;
      }
    } catch (e) {
      console.error(e.response);
      // history.push(AppRoutes.Home);
      return false;
    }
    return false;
  };


  const loadingContent = <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

  const infoText = t(`${translationKey}.info`);
  const successText = t(`${translationKey}.success`);

  const resolvedContent = <div className="bg-grey-1">
    <h4 className="bg-primary text-white p-2">
      {t(`${translationKey}.title`)}
    </h4>
    <div className="p-2">
      {infoText ? <AlertBox
        className="mb-2"
        type="info"
        content={t(`${translationKey}.info`)}
      /> : null}

      {successText && success ? <AlertBox
        className="mb-2"
        type="success"
        content={t(`${translationKey}.success`)}
      /> : null}

      {errorKey ? <AlertBox
        className="mb-2"
        type="danger"
        content={t(`${translationKey}.errors.${errorKey}`)}
      /> : null}

      <div className="">
        <button className="btn btn-primary">
          {success ? t(`${translationKey}.btn.successWith${isLoggedIn ? 'Auth' : 'outAuth'}`)
            : t(`${translationKey}.btn.errorWith${isLoggedIn ? 'Auth' : 'outAuth'}`)}
        </button>
      </div>
    </div>
  </div>

  return (
    <React.Fragment>
      <TitleBar
        content={t('title')}
      />
      <div className="container">
        <div className="d-flex align-items-center my-3 justify-content-center h-100" style={{ minHeight: '60vh' }}>
          {loading ? loadingContent : resolvedContent}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LinkResolver;
