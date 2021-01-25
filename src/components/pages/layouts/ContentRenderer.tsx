import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageColumn, PageItem, PageRow } from '../../../types/config/pages';
import { getExternalOrLocalContentURL } from '../../../utils/routeUtils';
import ImageCard from '../../cards/ImageCard/ImageCard';
import LoginCard from '../../cards/LoginCard';
import TeaserImage from '../../displays/TeaserImage';
import TitleBar from '../../displays/TitleBar';
import VideoPlayer from '../../displays/VideoPlayer';
import MarkdownLoader from './MarkdownLoader';

interface ContentRendererProps {
  isAuthenticated: boolean;
  rows: Array<PageRow>;
  pageKey: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = (props) => {
  const { t, i18n } = useTranslation([props.pageKey]);

  const renderItem = (item: PageItem) => {
    if (
      (item.hideWhen === 'auth' && props.isAuthenticated) ||
      (item.hideWhen === 'unauth' && !props.isAuthenticated)
    ) {
      return null;
    }
    switch (item.config.type) {
      case 'markdown':
        return <MarkdownLoader
          key={item.itemKey}
          className={item.className}
          languageCode={i18n.language}
          markdownUrl={item.config.markdownUrl}
        />
      case 'teaserImage':
        return <TeaserImage
          key={item.itemKey}
          image={item.config.image}
          textBox={item.config.textBox ? {
            className: item.config.textBox.className,
            title: item.config.textBox.titleKey ? t(`${item.itemKey}.${item.config.textBox.titleKey}`) : undefined,
            content: item.config.textBox.contentKey ? t(`${item.itemKey}.${item.config.textBox.contentKey}`) : undefined,
          } : undefined}
        />
      case 'imageCard':
        const action = item.config.action;
        return <ImageCard
          key={item.itemKey}
          className={item.className}
          imageSrc={item.config.imageSrc ? getExternalOrLocalContentURL(item.config.imageSrc) : undefined}
          imageAlt={t(`${item.itemKey}.imageAlt`)}
          title={t(`${item.itemKey}.title`)}
          body={t(`${item.itemKey}.body`)}
          openActionText={item.config.showActionBtn ? t(`${item.itemKey}.actionLabel`) : undefined}
          onClick={() => {
            if (!action) { return; }
            console.log(action);
          }}
        />
      case 'video':
        return <VideoPlayer
          key={item.itemKey}
          className={item.className}
          minHeight={item.config.minHeight}
          posterUrl={item.config.posterUrlKey ? t(`${item.itemKey}.${item.config.posterUrlKey} `) : undefined}
          sources={item.config.videoSources.map(vs => {
            return {
              src: t(`${item.itemKey}.${vs.urlKey} `),
              type: t(`${item.itemKey}.${vs.type} `)
            }
          })}
          fallbackText={item.config.fallbackTextKey ? t(`${item.itemKey}.${item.config.fallbackTextKey} `) : undefined}
        />
      case 'loginCard':
        return <LoginCard
          key={item.itemKey}
          className={item.className}
          title={t(`${item.itemKey}.title`)}
          infoText={item.config.showInfoText ? t(`${item.itemKey}.info`) : undefined}
          emailInputLabel={t(`${item.itemKey}.emailInputLabel`)}
          emailInputPlaceholder={t(`${item.itemKey}.emailInputPlaceholder`)}
          passwordInputLabel={t(`${item.itemKey}.passwordInputLabel`)}
          passwordInputPlaceholder={t(`${item.itemKey}.passwordInputPlaceholder`)}
          rememberMeLabel={t(`${item.itemKey}.rememberMeLabel`)}
          passwordForgottenBtn={t(`${item.itemKey}.passwordForgottenBtn`)}
          signupBtn={t(`${item.itemKey}.signupBtn`)}
          loginBtn={t(`${item.itemKey}.btn`)}
          onSubmit={(email, password, rememberMe) => { console.log('todo') }}
          onOpenDialog={(dialog) => console.log(dialog)}
        />
    }
    return <div
      key={item.itemKey}
      className={item.className}>
      {item.itemKey}
    </div>
  }

  const renderColumn = (col: PageColumn, index: number) => {
    return <div
      className={col.className}
      key={col.key ? col.key : index.toFixed()}>
      {col.items.map(item => renderItem(item))}
    </div>
  }

  return (
    <React.Fragment>
      <TitleBar
        content={t('title')}
      />
      {props.rows.map(row =>
        <div
          key={row.key}
          className={clsx(
            {
              "container": !row.fullWidth,
              "container-fluid": row.fullWidth
            },
            row.className)}
        >
          <div className="row">
            {row.columns.map((col, index) => renderColumn(col, index))}
          </div>
        </div>)}
    </React.Fragment>
  );
};

export default ContentRenderer;
