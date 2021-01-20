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
                            <ContentRenderer
                                pageKey={props.pageConfig.pageKey}
                                rows={props.pageConfig.rows}
                            />

                            <div className="w-50 m-3">
                                <ImageCard
                                    imageSrc={getExternalOrLocalContentURL('/images/placeholder_image.png')}
                                    title="testcard"
                                    body="testcontent"
                                    openActionText="action"
                                />
                            </div>

                        </div>
                    </React.Fragment>

                )
            }}
        />
    );
};

export default RouteToLayout;
