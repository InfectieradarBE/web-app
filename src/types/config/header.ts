export interface HeaderConfig {
    layout: "simpleLogo";
    config: SimpleLogoHeaderConfig;
}

export interface SimpleLogoHeaderConfig {
    image: {
        url: string;
        className?: string;
        altKey?: string;
        height?: number;
        width?: number;
    };
    className?: string;
    languages?: Array<{
        code: string;
        itemKey: string;
    }>;
}
