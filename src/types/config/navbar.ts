export interface NavbarConfig {
  items: Array<NavbarItemConfig>;
}

export interface NavbarItemConfig {
  type: 'internal' | 'dropdown';
  url: string;
  itemkey: string;
  hideWhen?: 'auth' | 'unauth';
  iconClass?: string;
  dropdownItems?: Array<DropdownItemConfig>;
}

export interface DropdownItemConfig {
  url: string;
  itemkey: string;
  iconClass?: string;
}
