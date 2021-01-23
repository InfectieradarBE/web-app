import React from 'react';
import { Route } from 'react-router-dom';
import { PageConfig } from '../../../types/config/pages';
import ContentRenderer from './ContentRenderer';


interface RouteToLayoutProps {
    path: string;
    pageConfig: PageConfig;
}

const RouteToLayout: React.FC<RouteToLayoutProps> = (props) => {
    // const { t } = useTranslation([props.pageConfig.pageKey]);
    const isAuthenticated = false;

    if (
        (props.pageConfig.hideWhen === 'auth' && isAuthenticated) ||
        (props.pageConfig.hideWhen === 'unauth' && !isAuthenticated)
    ) {
        return null;
    }
    return (
        <Route
            path={props.path}
            render={routeProps =>
                <ContentRenderer
                    isAuthenticated={isAuthenticated}
                    pageKey={props.pageConfig.pageKey}
                    rows={props.pageConfig.rows}
                />
            }
        />
    );
};

export default RouteToLayout;
