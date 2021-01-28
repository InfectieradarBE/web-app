import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { openDialogWithoutPayload, openLoginDialog } from '../../../store/dialogSlice';
// import { RootState } from '../../../store/rootReducer'

import { PageColumn, PageItem, PageRow } from '../../../types/config/pages';
import { getExternalOrLocalContentURL } from '../../../utils/routeUtils';
import ImageCard from '../../cards/ImageCard/ImageCard';
import LoginCard from '../../cards/LoginCard';
import SimpleCard from '../../cards/SimpleCard';
import AccordionList from '../../displays/AccordionList';
import ImageContainer from '../../displays/ImageContainer';
import LogoCredits from '../../displays/LogoCredits';
import SystemInfo from '../../displays/SystemInfo';
import TeaserImage from '../../displays/TeaserImage';
import TitleBar from '../../displays/TitleBar';
import VideoPlayer from '../../displays/VideoPlayer';
import AccountSettings from '../../settings/AccountSettings';
import CommunicationSettings from '../../settings/CommunicationSettings';
import DeleteAccount from '../../settings/DeleteAccount';
import OptionalSurveys from '../../study/OptionalSurveys';
import RequiredSurveys from '../../study/RequiredSurveys';
import MarkdownLoader from './MarkdownLoader';


interface ContentRendererProps {
  isAuthenticated: boolean;
  rows: Array<PageRow>;
  pageKey: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = (props) => {
  const { t, i18n } = useTranslation([props.pageKey]);
  const dispatch = useDispatch()
  const history = useHistory();

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
          imageSrc={getExternalOrLocalContentURL(item.config.imageSrc ? item.config.imageSrc : t(`${item.itemKey}.imageSrc`))}
          imageAlt={t(`${item.itemKey}.imageAlt`)}
          title={t(`${item.itemKey}.title`)}
          body={t(`${item.itemKey}.body`)}
          openActionText={item.config.showActionBtn ? t(`${item.itemKey}.actionLabel`) : undefined}
          onClick={() => {
            if (!action) { return; }
            if (action.type === 'openDialog') {
              dispatch(openDialogWithoutPayload(action.value))
            } else if (action.type === 'navigate') {
              history.push(action.value);
            }
          }}
        />
      case 'image':
        return <ImageContainer
          key={item.itemKey}
        // className={item.className}
        />
      case 'video':
        return <VideoPlayer
          key={item.itemKey}
          className={item.className}
          minHeight={item.config.minHeight}
          posterUrl={item.config.posterUrlKey ? t(`${item.itemKey}.${item.config.posterUrlKey}`) : undefined}
          sources={item.config.videoSources.map(vs => {
            console.log(t(`${item.itemKey}.${vs.type}`))
            return {
              src: t(`${item.itemKey}.${vs.urlKey}`),
              type: vs.type,
            }
          })}
          fallbackText={item.config.fallbackTextKey ? t(`${item.itemKey}.${item.config.fallbackTextKey}`) : undefined}
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
          onSubmit={(email, password, rememberMe) => {
            dispatch(openLoginDialog({
              type: 'login',
              payload: {
                email,
                password,
                rememberMe,
              }
            }))
          }}
          onOpenDialog={(dialog) => console.log(dialog)}
        />
      case 'accordionList':
        const items = t(`${item.itemKey}`, { returnObjects: true }) as Array<{ title: string; content: string; }>;
        return <AccordionList
          key={item.itemKey}
          items={items}
          openLabel={t(`${item.config.accordionCtrlsKey}.open`)}
          closeLabel={t(`${item.config.accordionCtrlsKey}.close`)}
        />
      case 'simpleCard':
        return <SimpleCard
          key={item.itemKey}
          className={item.className}
          title={item.config.titleKey ? t(`${item.config.titleKey}`) : undefined}
          content={t(`${item.config.contentKey}`)}
          variant={item.config.variant}
        />
      case 'systemInfo':
        return <SystemInfo
          key={item.itemKey}
        />
      case 'accountSettings':
        return <AccountSettings
          key={item.itemKey}
        />
      case 'communicationSettings':
        return <CommunicationSettings
          key={item.itemKey}
        />
      case 'deleteAccount':
        return <DeleteAccount
          key={item.itemKey}
        />
      case 'logoCredits':
        return <LogoCredits
          key={item.itemKey}
        />
      case 'requiredSurveys':
        return <RequiredSurveys
          key={item.itemKey}
        />
      case 'optionalSurveys':
        return <OptionalSurveys
          key={item.itemKey}
        />
      case 'router':
        return <p
          key={item.itemKey}
        >todo</p>
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
