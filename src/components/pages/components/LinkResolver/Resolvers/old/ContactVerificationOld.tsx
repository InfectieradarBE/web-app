import React, { useEffect } from 'react';
/*import { useQuery } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { AppRoutes } from '../../../routes';
import Button from '../../../components/ui/buttons/Button/Button';
import { navigationActions } from '../../../store/navigation/navigationSlice';
*/

const VerifyToken: React.FC = () => {
  /*const query = useQuery();
  const token = query.get("token");

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    if (token) {
      dispatch(navigationActions.closeAllDialogs());
      dispatch(navigationActions.openEmailVerificationSuccessDialog(token));
      history.push(AppRoutes.Home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


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

export default VerifyToken;
