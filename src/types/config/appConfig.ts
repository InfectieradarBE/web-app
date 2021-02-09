export interface AppConfig {
  instanceId: string;
  languages: Array<LanguageConfig>;
}

export interface LanguageConfig {
  code: string;
  itemKey: string;
}
