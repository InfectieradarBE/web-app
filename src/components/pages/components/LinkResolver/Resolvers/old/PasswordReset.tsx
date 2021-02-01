import React, { useEffect } from 'react';
/*import { useQuery } from '../../../hooks';

import { useHistory } from 'react-router';
import { navigationActions } from '../../../store/navigation/navigationSlice';
import { useDispatch } from 'react-redux';
import { AppRoutes } from '../../../routes';
import Button from '../../../components/ui/buttons/Button/Button';
import { resetAuth } from '../../../api/instances/auth-api-instance';
*/

const PasswordReset: React.FC = () => {
  /*const dispatch = useDispatch();

  const query = useQuery();
  const token = query.get("token");
  const history = useHistory();

  useEffect(() => {
    resetAuth();
    dispatch(navigationActions.closeAllDialogs());
    if (!token) {
      history.push(AppRoutes.Home);
      return;
    }
    dispatch(navigationActions.openResetPasswordDialog({ token: token, type: "reset" }));
    history.push(AppRoutes.Home);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default PasswordReset;
