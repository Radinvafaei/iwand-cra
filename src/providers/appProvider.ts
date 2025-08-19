let appConfig: { apiKey: string; host: string } | null = null;

export function setAppConfig(config: { apiKey: string; host: string }) {
  appConfig = config;
}

export function getAppConfig() {
  if (!appConfig) {
    throw new Error("App config not set yet");
  }
  return appConfig;
}
