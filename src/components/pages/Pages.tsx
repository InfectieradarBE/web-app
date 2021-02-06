import React from 'react';

import { PagesConfig } from '../../types/config/pages';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouteToLayout from './components/RouteToLayout';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';
import LinkResolver, { linkResolverRootUrl } from './components/LinkResolver/LinkResolver';
import { DefaultRoutes } from '../../types/config/routing';
import SurveyPage from './components/SurveyPage';


interface PagesProps {
  config?: PagesConfig;
  onOpenExternalPage: (url: string) => void;
}

const Pages: React.FC<PagesProps> = (props) => {
  const isAuth = useIsAuthenticated();

  if (!props.config) {
    // Loading page:
    return <div className="container">
      <div className="d-flex align-items-center my-3 bg-secondary justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  }

  const defaultRoutes: DefaultRoutes = props.config.defaultRoutes ? props.config.defaultRoutes : {
    auth: '/home',
    unauth: '/home',
    studyPage: '/home',
    surveyPage: '/surveys',
  }

  return (
    <div>
      <Switch >
        {props.config.pages.map(pageConfig => {
          return <RouteToLayout
            key={pageConfig.path}
            path={pageConfig.path}
            pageConfig={pageConfig}
            defaultRoutes={defaultRoutes}
          />
        })}
        <Route path={defaultRoutes.surveyPage} render={() => <SurveyPage />} />
        <Route path={linkResolverRootUrl} render={() => <LinkResolver defaultRoutes={defaultRoutes} />} />,
        <Redirect to={isAuth ? defaultRoutes.auth : defaultRoutes.unauth} />
      </Switch>
    </div>
  );
};

export default Pages;
