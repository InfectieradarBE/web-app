import React, { useEffect, useState } from 'react';
import { DefaultRoutes } from '../../../../../types/config/routing';
import { useTranslation } from 'react-i18next';
import { useLogout } from '../../../../../hooks/useLogout';
import TitleBar from '../../../../displays/TitleBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/rootReducer';
import { useUrlQuery } from '../../../../../hooks/useUrlQuery';
import { LinkResolverPaths } from '../LinkResolver';
import { useHistory } from 'react-router-dom';
import { autoValidateTemporaryTokenReq } from '../../../../../api/authAPI';
import { getErrorMsg } from '../../../../../api/utils';
import { openDialogWithoutPayload, openLoginDialog } from '../../../../../store/dialogSlice';
import { useAuthTokenCheck } from '../../../../../hooks/useAuthTokenCheck';
import LoginCard from '../../../../cards/LoginCard';

interface StudyLoginProps {
  defaultRoutes: DefaultRoutes;
}

const translationRootKey = 'studyLogin';

const StudyLogin: React.FC<StudyLoginProps> = (props) => {
  const dispatch = useDispatch();

  const query = useUrlQuery();
  const history = useHistory();
  const hasToken = useAuthTokenCheck();
  const logout = useLogout();
  const logedInUser = useSelector((state: RootState) => state.user.currentUser.account.accountId);

  const { t } = useTranslation(["linkresolvers"]);
  const accessToken = useSelector((state: RootState) => state.app.auth?.accessToken);

  const [loginData, setLoginData] = useState({ accountId: '', verificationCode: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = query.get("token");
    let replaceUrl = LinkResolverPaths.StudyLogin;

    validateToken(token).then(
      stayOnPage => {
        if (stayOnPage) {
          history.replace(replaceUrl);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const validateToken = async (token: string | null): Promise<boolean> => {
    if (!token) {
      return true;
    };

    setLoading(true);
    try {
      const response = await autoValidateTemporaryTokenReq(token, accessToken ? accessToken : '');
      if (response.status === 200) {
        if (hasToken) {
          if (logedInUser !== response.data.accountId) {
            logout(true);
          } else if (response.data.isSameUser) {
            history.replace(props.defaultRoutes.studyPage);
            return false;
          } else {
            logout(true);
          }
        }
      }
      setLoginData({
        accountId: response.data.accountId,
        verificationCode: response.data.verificationCode,
      });
    } catch (e) {
      console.error(getErrorMsg(e))
    } finally {
      setLoading(false);
    }
    return true;
  };

  const resolvedContent = () => <div style={{ width: 500 }}>
    <LoginCard
      title={t(`${translationRootKey}.content.cardTitle`)}
      infoText={t(`${translationRootKey}.content.info`)}
      emailInputLabel={t(`${translationRootKey}.content.emailInputLabel`)}
      emailInputPlaceholder={t(`${translationRootKey}.content.emailInputPlaceholder`)}
      passwordInputLabel={t(`${translationRootKey}.content.passwordInputLabel`)}
      passwordInputPlaceholder={t(`${translationRootKey}.content.passwordInputPlaceholder`)}
      rememberMeLabel={t(`${translationRootKey}.content.rememberMeLabel`)}
      loginBtn={t(`${translationRootKey}.content.btn`)}
      passwordForgottenBtn={t(`${translationRootKey}.content.passwordForgottenBtn`)}
      signupBtn={t(`${translationRootKey}.content.signupBtn`)}
      fixEmailValue={loginData.accountId}
      onOpenDialog={(dialog) => {
        dispatch(openDialogWithoutPayload(dialog));
      }}
      onSubmit={(email, password, rememberMe) => {
        dispatch(openLoginDialog(
          {
            type: 'login',
            payload: {
              email: email,
              password: password,
              verificationCode: loginData.verificationCode,
              rememberMe: rememberMe
            }
          }
        ));
      }}
    />
  </div>

  const loadingContent = <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

  return (
    <React.Fragment>
      <TitleBar
        content={t(`${translationRootKey}.title`)}
      />
      <div className="container">
        <div className="d-flex align-items-center my-3 justify-content-center h-100" style={{ minHeight: '60vh' }}>
          {loading ? loadingContent : resolvedContent()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudyLogin;
