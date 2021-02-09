export interface DialogConfig {
  languages: Array<DialogLanguageConfig>;
}

export interface DialogLanguageConfig {
  code: string;
  itemKey: string;
}
