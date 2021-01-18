export interface HeaderConfig {
    layout: "simpleLogo";
    config: SimpleLogoHeaderConfig;
}

export interface SimpleLogoHeaderConfig {
    image: {
        altKey?: string;
        sm: {
            url: string;
            className?: string;
            height?: number;
            width?: number;
        },
        lg: {
            url: string;
            className?: string;
            height?: number;
            width?: number;
        }
    };
    className?: string;
    languages?: Array<{
        code: string;
        itemKey: string;
    }>;
}
