import React from 'react';
import { Route } from 'react-router-dom';
import { PageConfig } from '../../../types/config/pages';
import TeaserImage from '../../displays/TeaserImage';
import TitleBar from '../../displays/TitleBar';
import { useTranslation } from 'react-i18next';

interface RouteToLayoutProps {
    path: string;
    pageConfig: PageConfig;
}

const RouteToLayout: React.FC<RouteToLayoutProps> = (props) => {
    const { t } = useTranslation([props.pageConfig.pageKey]);
    console.log(props.pageConfig)
    return (
        <Route
            path={props.path}
            render={routeProps => (
                // pass the sub-routes down to keep nesting
                //<route.component {...props} routes={route.routes} />
                <div>
                    <TitleBar
                        content={t('title')}
                    />
                    { props.pageConfig.teaserImage ?
                        <TeaserImage
                            image={props.pageConfig.teaserImage.image}
                            textBox={{
                                className: props.pageConfig.teaserImage.textBox?.className,
                                title: props.pageConfig.teaserImage.textBox?.titleKey ? t(props.pageConfig.teaserImage.textBox?.titleKey) : undefined,
                                content: props.pageConfig.teaserImage.textBox?.contentKey ? t(props.pageConfig.teaserImage.textBox?.contentKey) : undefined,
                            }}
                        />

                        : null}

                    <div className="container">
                        <p>{props.pageConfig.path}</p>
                        <p>{props.pageConfig.layout}</p>
                    </div>

                </div>

            )}
        />
    );
};

export default RouteToLayout;
