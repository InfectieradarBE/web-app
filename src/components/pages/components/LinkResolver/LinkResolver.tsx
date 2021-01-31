import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ContactVerification from './Resolvers/ContactVerification';
import PasswordReset from './Resolvers/PasswordReset';
import StudyLogin from './Resolvers/StudyLogin';
import Invitation from './Resolvers/Invitation';
import { DefaultRoutes } from '../../../../types/config/routing';
import { useUrlQuery } from '../../../../hooks/useUrlQuery';

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
  console.log(query);
  const token = query.get("token");
  console.log(token);

  return (
    <Switch>
      <Route path={LinkResolverPaths.ContactVerification} component={ContactVerification} />
      <Route path={LinkResolverPaths.PasswordReset} component={PasswordReset} />
      <Route path={LinkResolverPaths.StudyLogin} render={() => <StudyLogin studyPageUrl={props.defaultRoutes.studyPage} />} />
      <Route path={LinkResolverPaths.Invitation} component={Invitation} />
      {/* todo: unsubscribe */}
    </Switch>
  );
};

export default LinkResolver;
