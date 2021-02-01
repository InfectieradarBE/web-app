import { removePersistedState } from '../store/localStorage';
import { useHistory } from 'react-router-dom';
import { resetApiAuth } from '../api/instances/authenticatedApi';

export const useLogout = () => {
  const history = useHistory();

  return (withoutRedirect?: boolean) => {
    resetApiAuth();
    removePersistedState();
    if (history && !withoutRedirect) {
      history.push('/');
    }
  }
}
