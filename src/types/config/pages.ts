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
}
