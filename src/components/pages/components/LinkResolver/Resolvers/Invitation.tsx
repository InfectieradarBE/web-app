import React from 'react';
/*import { useQuery, useMountEffect, useAuthTokenCheck } from '../../../hooks';
import { verifyContactReq } from '../../../api/user-management-api';
import Button from '../../../components/ui/buttons/Button/Button';
import { AppRoutes } from '../../../routes';
import { navigationActions } from '../../../store/navigation/navigationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../store';
import { resetAuth } from '../../../api/instances/auth-api-instance';*/

const Invitation: React.FC = () => {
  /*const dispatch = useDispatch();

  const query = useQuery();
  const token = query.get("token");
  const history = useHistory();
  const hasToken = useAuthTokenCheck();
  const logedInUser = useSelector((state: RootState) => state.user.currentUser.account.accountId);

  useMountEffect(() => {
    dispatch(navigationActions.closeAllDialogs());
    verifyEmail();
  });

  const verifyEmail = async () => {
    if (!token) return;
    try {
      const response = await verifyContactReq(token);
      if (response.status === 200) {
        console.log(response.data);
        if (hasToken && logedInUser !== response.data.account.accountId) {
          resetAuth();
        }
        dispatch(navigationActions.openResetPasswordDialog({ token: token, type: "invite" }));
        history.push(AppRoutes.Home);
      }
    } catch (e) {
      console.error(e.response);
      history.push(AppRoutes.Home);
    }
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
        <Button
          label={'Home'}
          onClick={() => {
            history.push(AppRoutes.Home)
          }} />
      </div>
    </div>
  );*/
  return <p>todo</p>
};

export default Invitation;
