export interface PagesConfig {
    pages: Array<PageConfig>;
}

export interface PageConfig {
    path: string;
    pageKey: string;
    rows: Array<PageRow>;
}

export interface PageRow {
    className?: string;
    fullWidth?: boolean;
    columns: Array<PageColumn>;
}

export interface PageColumn {
    className?: string;
    items: Array<PageItem>;
}

export interface PageItem {
    itemKey: string;
    className?: string;
    hideWhen?: 'auth' | 'unauth';
    config: TeaserImageConfig | RouterComponentConfig | MarkdownComponentConfig | ImageCardConfig;
}

export interface MarkdownComponentConfig {
    type: 'markdown';
    markdownUrl: string;
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
    action: {
        type: 'navigate' | 'openDialog';
        value: string;
    };
    imageSrc?: string,
    imageAltKey?: string,
    titleKey?: string,
    bodyKey?: string,
    actionTextKey?: string,
    className?: string;
}

export interface RouterComponentConfig {
    type: 'router';
}

