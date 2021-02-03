import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DefaultRoutes } from '../../../../types/config/routing';
import { useIsAuthenticated } from '../../../../hooks/useIsAuthenticated';
import ContactVerification from './Resolvers/ContactVerification';
import Invitation from './Resolvers/Invitation';
import StudyLogin from './Resolvers/StudyLogin';
import PasswordReset from './Resolvers/PasswordReset';


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
  const isLoggedIn = useIsAuthenticated();

  return (
    <Switch>
      <Route path={LinkResolverPaths.ContactVerification} render={() => <ContactVerification defaultRoutes={props.defaultRoutes} />} />
      <Route path={LinkResolverPaths.PasswordReset} render={() => <PasswordReset defaultRoutes={props.defaultRoutes} />} />
      <Route path={LinkResolverPaths.StudyLogin} render={() => <StudyLogin defaultRoutes={props.defaultRoutes} />} />
      <Route path={LinkResolverPaths.Invitation} render={() => <Invitation defaultRoutes={props.defaultRoutes} />} />
      {/* todo: unsubscribe */}
      <Redirect to={isLoggedIn ? props.defaultRoutes.auth : props.defaultRoutes.unauth} />
    </Switch>
  );
};

export default LinkResolver;
