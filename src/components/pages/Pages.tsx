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
            rows: [
                {
                    className: "",
                    fullWidth: true,
                    columns: [
                        {
                            className: "p-0",
                            items: [
                                {
                                    itemKey: "topImage",

                                    config: {
                                        type: 'teaserImage',
                                        image: {
                                            // url: '/images/placeholder_image.png',
                                            url: '/images/ANP-371602781-1024.jpg',
                                            backgroundPosition: "center",
                                            height: 350
                                        },
                                        textBox: {
                                            className: "col-12 col-sm-8 col-md-5 px-0 py-2",
                                            titleKey: "title",
                                            contentKey: "content",
                                        }
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
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
                {props.config.pages.map(pageConfig => {
                    return <RouteToLayout
                        key={pageConfig.path}
                        path={pageConfig.path}
                        pageConfig={pageConfig}
                    />
                }

                )}
                <Redirect to="/home" />
            </Switch>
        </div>
    );
};

export default Pages;
