import React from 'react';

import { PageConfig, PagesConfig } from '../../types/config/pages';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouteToLayout from './layouts/RouteToLayout';
import { commonRoutes } from './routes/DefaultRoutes';


interface PagesProps {
  config?: PagesConfig;
  onOpenExternalPage: (url: string) => void;
}

const Pages: React.FC<PagesProps> = (props) => {
  if (!props.config) {
    return <p>content loading... </p>
  }

  return (
    <div>
      <Switch >
        {commonRoutes}
        {props.config.pages.map(pageConfig => {
          return <RouteToLayout
            key={pageConfig.path}
            path={pageConfig.path}
            pageConfig={pageConfig}
          />
        })}
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Pages;
