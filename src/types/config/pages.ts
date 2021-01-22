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
    config: TeaserImageConfig | RouterComponentConfig | MarkdownComponentConfig;
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

export interface RouterComponentConfig {
    type: 'router';
}

