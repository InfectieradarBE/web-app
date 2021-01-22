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

                        <div className="container">
                            <div className="row">
                                <div className="col-5">

                                </div>
                            </div>
                        </div>


                        <div className="container my-3">
                            <div className="row">
                                <div className="col-7">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, suscipit dolorem quos molestias repellat architecto nulla deserunt possimus asperiores aspernatur, numquam necessitatibus sequi qui reiciendis quas autem, fuga optio atque!</p>

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
