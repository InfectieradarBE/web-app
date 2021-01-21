import React from 'react';

import { PageConfig, PagesConfig } from '../../types/config/pages';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouteToLayout from './layouts/RouteToLayout';
import { commonRoutes } from './routes/DefaultRoutes';
import { ImageCardConfigs } from '../../types/config/imageCards';

interface PagesProps {
    config?: PagesConfig;
    imageCardsConfigs?: ImageCardConfigs;
    onOpenExternalPage: (url: string) => void;
}

const Pages: React.FC<PagesProps> = (props) => {
    if (!props.config) {
        return <p>content loading... </p>
    }

    const pages: Array<PageConfig> = [
        {
            path: '/privacy', pageKey: 'privacy',
            rows: [
                {
                    className: "my-3",
                    columns: [
                        {
                            className: "col-12 col-sm-10 col-md-8",
                            items: [
                                {
                                    itemKey: "privacyPolicy",
                                    className: "",
                                    config: {
                                        type: "markdown",
                                        markdownUrl: "privacy.md"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/test',
            pageKey: 'test',
            teaserImage: {
                image: {
                    url: 'http://localhost:3000/example-content/images/placeholder_image.png',
                    backgroundPosition: "center",
                    height: 250
                },
                textBox: {
                    className: "py-2",
                    titleKey: "topImageTitle",
                    // content: "test"
                    contentKey: "topImageContent",
                }
            },
            rows: [{
                className: "mt-3",
                columns: [
                    {
                        className: "col-12 col-sm-6",
                        items: [
                            {
                                itemKey: "form",
                                className: "p-2 bg-grey-1",
                                config: {
                                    type: "router",
                                }
                            }
                        ]
                    }
                ]
            }]
        }
    ]

    return (
        <div>
            <Switch >
                {commonRoutes}
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
