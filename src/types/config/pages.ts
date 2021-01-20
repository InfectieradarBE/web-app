export interface PagesConfig {
    pages: Array<PageConfig>;
}

export interface PageConfig {
    path: string;
    pageKey: string;
    layout: string;
    teaserImage?: {
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
    };
    rows: Array<PageRow>;
}

export interface PageRow {
    className?: string;
    columns: Array<PageColumn>;
}

export interface PageColumn {
    className?: string;
    items: Array<PageItem>;
}

export interface PageItem {
    itemKey: string;
    className?: string;
    type: string;
    // type
}