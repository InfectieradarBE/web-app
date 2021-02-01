import React, { useState, useEffect } from 'react';
/*import { useQuery } from '../../../hooks/useQuery';
import { useAuthTokenCheck } from '../../../hooks';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../../routes';
import { autoValidateTemporaryTokenReq } from '../../../api/auth-api';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth } from '../../../api/instances/auth-api-instance';

import { LinearProgress } from '@material-ui/core';
import { navigationActions } from '../../../store/navigation/navigationSlice';*/


interface StudyLoginProps {
  studyPageUrl: string;
}


const StudyLogin: React.FC<StudyLoginProps> = (props) => {
  /*const dispatch = useDispatch();

  const query = useQuery();
  const token = query.get("token");
  const history = useHistory();
  const hasToken = useAuthTokenCheck();
  const logedInUser = useSelector((state: RootState) => state.user.currentUser.account.accountId);


  const persistState = useSelector((state: RootState) => state.general.persistState);
  const accessToken = useSelector((state: RootState) => state.api.accessToken);

  const [loading, setLoading] = useState(false);*/

  console.log(props.studyPageUrl)

  /*
  const validateToken = async () => {
    if (!token) {
      dispatch(navigationActions.openLoginDialog());
      history.push(AppRoutes.Home);
      return;
    };
    setLoading(true);
    try {
      const response = await autoValidateTemporaryTokenReq(token, accessToken)
      setLoading(false);
      if (response.status === 200) {
        if (hasToken) {
          if (logedInUser !== response.data.accountId) {
            resetAuth();
          } else if (response.data.isSameUser) {
            history.push(AppRoutes.Home);
            return;
          } else {
            resetAuth();
          }
        }
      }
      dispatch(navigationActions.openLoginDialog(
        {
          email: response.data.accountId,
          password: '',
          verificationCode: response.data.verificationCode,
          rememberMe: persistState
        }
      ));
      history.push(AppRoutes.Home);
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.data && e.response.data.error) {

      }
      console.error(e.response);
      dispatch(navigationActions.openLoginDialog());
      history.push(AppRoutes.Home);
    }
  };


  useEffect(() => {
    dispatch(navigationActions.closeAllDialogs());
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

*/

  return (
    <React.Fragment>
      {/*(loading) && <LinearProgress />*/}
      <div className="container">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
          <h3>Loading...</h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudyLogin;
