import React from 'react';
import { Route } from 'react-router-dom';
import { PageConfig } from '../../../types/config/pages';
import TeaserImage from '../../displays/TeaserImage';
import TitleBar from '../../displays/TitleBar';
import { useTranslation } from 'react-i18next';
import ImageCard from '../../cards/ImageCard/ImageCard';
import { getExternalOrLocalContentURL } from '../../../utils/routeUtils';
import ContentRenderer from './ContentRenderer';


interface RouteToLayoutProps {
    path: string;
    pageConfig: PageConfig;
}

const RouteToLayout: React.FC<RouteToLayoutProps> = (props) => {
    const { t } = useTranslation([props.pageConfig.pageKey]);
    const isAuthenticated = false;

    return (
        <Route
            path={props.path}
            render={routeProps => {
                return (
                    <React.Fragment>
                        <TitleBar
                            content={t('title')}
                        />

                        <ContentRenderer
                            isAuthenticated={isAuthenticated}
                            pageKey={props.pageConfig.pageKey}
                            rows={props.pageConfig.rows}
                        />

                        <div className="container" style={{ minHeight: '50vh' }}>
                            <div className="row">

                                <div className="col-4 my-3">
                                    <ImageCard
                                        imageSrc={getExternalOrLocalContentURL('/images/placeholder_image.png')}
                                        title="testcard"
                                        body="testcontent"
                                        openActionText="action"
                                    />
                                </div>                            <div className="col-4 my-3">
                                    <ImageCard
                                        imageSrc={getExternalOrLocalContentURL('/images/placeholder_image.png')}
                                        title="testcard"
                                        body="testcontent"
                                        openActionText="action"
                                    />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>

                )
            }}
        />
    );
};

export default RouteToLayout;
