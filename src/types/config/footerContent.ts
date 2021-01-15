export interface FooterContentConfig {
    columns: Array<FooterColumnConfig>;
}

export interface FooterColumnConfig {
    columnKey: string;
    items: Array<FooterLinkItemConfig>;
}

export interface FooterLinkItemConfig {
    type: 'internal' | 'external' | 'language';
    itemKey: string;
    url: string;
    iconClass?: string;
    languageCode?: string;
}
