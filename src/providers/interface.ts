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

export const linkDictionary: Record<string, string> = {
  "Dashboard": '/',
  "Plans": '/plans',
  "Customization": '/customization',
  "Agent Config": '/config',
  "Testing": '/test',
  "Conversation": '/conversation'
}
