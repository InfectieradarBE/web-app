export interface PagesConfig {
  pages: Array<PageConfig>;
  defaultRoutes?: {
    auth: string;
    unauth: string;
  }
}

export interface PageConfig {
  path: string;
  pageKey: string;
  hideWhen?: 'auth' | 'unauth';
  rows: Array<PageRow>;
}

export interface PageRow {
  key: string;
  className?: string;
  fullWidth?: boolean;
  columns: Array<PageColumn>;
}

export interface PageColumn {
  key?: string;
  className?: string;
  items: Array<PageItem>;
}

export interface PageItem {
  itemKey: string;
  className?: string;
  hideWhen?: 'auth' | 'unauth';
  config: PageItemConfig;
}

type PageItemConfig = TeaserImageConfig | RouterComponentConfig |
  MarkdownComponentConfig | ImageCardConfig | LoginCardConfig | VideoConfig | ImageConfig |
  AccordionListConfig | SimpleCard | SystemInfoConfig | AccountSettingsConfig |
  CommunicationSettingsConfig | DeleteAccountConfig | LogoCreditsConfig |
  RequiredSurveysConfig | OptionalSurveysConfig | LinkListConfig


export interface MarkdownComponentConfig {
  type: 'markdown';
  markdownUrl: string;
}

export interface ImageConfig {
  type: 'image';
  url?: string;
  urlKey?: string;
  altKey?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export interface VideoConfig {
  type: 'video';
  minHeight?: number;
  posterUrlKey?: string;
  videoSources: Array<{
    urlKey: string;
    type: string;
  }>;
  fallbackTextKey?: string;
}

export interface TeaserImageConfig {
  type: 'teaserImage',
  image: {
    url: string;
    height?: number;
    className?: string;
    backgroundPosition?: string;
  }
  textBox?: {
    className?: string;
    titleKey?: string;
    contentKey?: string;
  }
}

export interface ImageCardConfig {
  type: 'imageCard';
  action?: {
    type: 'navigate' | 'openDialog';
    value: string;
  };
  imageSrc?: string;
  className?: string;
  showActionBtn?: boolean;
}

interface LoginCardConfig {
  type: 'loginCard';
  showInfoText: boolean;
}

export interface AccordionListConfig {
  type: 'accordionList';
  accordionCtrlsKey: string;
}

export interface SimpleCard {
  type: 'simpleCard';
  titleKey?: string;
  contentKey: string;
  variant?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface LinkListConfig {
  type: 'linkList';
  links: Array<{
    linkKey: string;
    type: 'internal' | 'external' | 'language' | 'dialog';
    value: string;
  }>;
}

export interface SystemInfoConfig {
  type: 'systemInfo';
  showBrowserInfo: boolean;
}

export interface AccountSettingsConfig {
  type: 'accountSettings';
  allowProfileSettings: boolean;
}

export interface CommunicationSettingsConfig {
  type: 'communicationSettings';
  languages?: Array<{
    code: string;
    itemKey: string;
  }>;
}

export interface DeleteAccountConfig {
  type: 'deleteAccount';
  // TODO: delete only account, delete data as well
}

export interface LogoCreditsConfig {
  type: 'logoCredits';
  useTitle?: boolean;
  images: Array<{
    url: string;
    altKey: string;
    width?: number | string;
    height?: number | string;
    containerClassName?: string;
  }>;
}

export interface RequiredSurveysConfig {
  type: 'requiredSurveys';
}

export interface OptionalSurveysConfig {
  type: 'optionalSurveys';
}

export interface RouterComponentConfig {
  type: 'router';
}
