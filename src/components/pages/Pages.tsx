import React from 'react';
import TeaserImage from '../displays/TeaserImage';
import TitleBar from '../displays/TitleBar';

import { PageConfig, PagesConfig } from '../../types/config/pages';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouteToLayout from './layouts/RouteToLayout';

interface PagesProps {
    config?: PagesConfig;
    onOpenExternalPage: (url: string) => void;
}

const Pages: React.FC<PagesProps> = (props) => {
    if (!props.config) {
        return <p>content loading... </p>
    }

    const pages: Array<PageConfig> = [
        { path: '/test', pageKey: 'test', layout: "markdown" },
        {
            path: '/privacy',
            pageKey: 'privacy',
            layout: "markdown",
            teaserImage: {
                image: {
                    url: '/example-content/images/placeholder_image.png',
                    backgroundPosition: "center",
                    height: 250
                },
                textBox: {
                    className: "py-2",
                    titleKey: "topImageTitle",
                    // content: "test"
                    contentKey: "topImageContent",
                }
            }
        }
        ,
    ];

    return (
        <div>
            <Switch >
                {pages.map(pageConfig => {
                    return <RouteToLayout
                        key={pageConfig.path}
                        path={pageConfig.path}
                        pageConfig={pageConfig}
                    />
                }

                )}
                <Redirect to="/test" />
            </Switch>
        </div>
    );
};

export default Pages;
