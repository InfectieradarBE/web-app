export interface AppConfig {
  instanceId: string;
  languages: Array<LanguageConfig>;
  avatars: Array<AvatarConfig>;
}

export interface LanguageConfig {
  code: string;
  itemKey: string;
}

export interface AvatarConfig {
  avatarId: string;
  url: string;
}
