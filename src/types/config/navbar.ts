export interface NavbarConfig {
  items: Array<NavbarItemConfig>;
}

export interface NavbarItemConfig {
  type: 'internal' | 'dropdown';
  url: string;
  itemkey: string;
  hideWhen?: string;
  iconClass?: string;
}
