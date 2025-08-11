import {Tabs} from "src/service/interface";

export interface IConfig {
  apiKey: string,
  host: string,
  forceRedirect: boolean,
}

export interface IShopifySidebarLink {
  label: Tabs,
  destination: string,
}

export const linkDictionary: Record<Tabs, string> = {
  [Tabs.Dashboard]: '/',
  [Tabs.Plans]: '/plans',
  [Tabs.Customization]: '/customization',
  [Tabs["Agent Config"]]: '/config',
  [Tabs.Testing]: '/test',
  [Tabs.Conversation]: '/conversation'
}
