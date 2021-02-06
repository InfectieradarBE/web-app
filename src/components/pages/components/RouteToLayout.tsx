import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useIsAuthenticated } from '../../../hooks/useIsAuthenticated';
import { PageConfig } from '../../../types/config/pages';
import { DefaultRoutes } from '../../../types/config/routing';
import ContentRenderer from './ContentRenderer';


interface RouteToLayoutProps {
  path: string;
  pageConfig: PageConfig;
  defaultRoutes: DefaultRoutes;
}

const RouteToLayout: React.FC<RouteToLayoutProps> = (props) => {
  // const { t } = useTranslation([props.pageConfig.pageKey]);
  const isAuthenticated = useIsAuthenticated();

  if (
    (props.pageConfig.hideWhen === 'auth' && isAuthenticated) ||
    (props.pageConfig.hideWhen === 'unauth' && !isAuthenticated)
  ) {
    return <Route
      path={props.path}
      render={routeProps =>
        <Redirect to={isAuthenticated ? props.defaultRoutes.auth : props.defaultRoutes.unauth} />
      }
    />
  }

  return (
    <Route
      path={props.path}
      render={routeProps =>
        <ContentRenderer
          isAuthenticated={isAuthenticated}
          pageKey={props.pageConfig.pageKey}
          rows={props.pageConfig.rows}
          defaultRoutes={props.defaultRoutes}
        />
      }
    />
  );
};

export default RouteToLayout;
