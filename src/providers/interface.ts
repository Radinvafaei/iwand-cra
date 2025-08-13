import {Tabs} from "../service/interface";

export interface IConfig {
  apiKey: string,
  host: string,
  forceRedirect: boolean,
}

export interface IShowPlansManagerContext {
  show_plans: boolean;
  plans_refetch: Function;
  active_tabs_refetch: Function;
  active_tabs: Tabs[];
  isLoading: boolean;
}