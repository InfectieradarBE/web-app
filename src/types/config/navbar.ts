export interface NavbarConfig {
  leftItems: Array<NavbarItemConfig>;
  rightItem: Array<NavbarItemConfig>;
  breakpoint?: string;
}

export interface NavbarItemConfig {
  type: 'internal' | 'dropdown' | 'dialog';
  url: string;
  itemKey: string;
  hideWhen?: 'auth' | 'unauth';
  iconClass?: string;
  dropdownItems?: Array<NavbarItemConfig>;
}
