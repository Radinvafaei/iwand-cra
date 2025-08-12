import {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import {IConfig, IShowPlansManagerContext, linkDictionary} from "./interface";
import { BrowserRouter } from "react-router-dom";
import {
  Provider as AppBridgeProvider,
  NavigationMenu,
} from "@shopify/app-bridge-react";
import AppBridgeError from "../components/ErrorComponents/AppBridgeError";
import AppBridgeErrorContainer from "../components/ErrorComponents/AppBridgeConfigError";
import {useGetActiveTabs, useShowPlans} from "../service/hooks";
import useGetShopName from "../hooks/useGetShopName";
import {NavigationLink} from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import useEmbedding from "./useEmbedding";
const SHOPIFY_API_KEY = "be32a232bb533bbe2c475cc64ff75777";

const ShowPlansManager = createContext<IShowPlansManagerContext>({} as IShowPlansManagerContext);
export const useShowPlansManager = () => useContext(ShowPlansManager);

const ShopifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isReady, isEmbedded } = useEmbedding();
  const [appBridgeConfig, setAppBridgeConfig] = useState<IConfig>();
  const [appBridgeError, setAppBridgeError] = useState<string>();
  const name = useGetShopName();
  const { data } = useGetActiveTabs(name as string);
  const { data: showPlans, refetch } = useShowPlans(name!);
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([]);

  useEffect(() => {
    if(showPlans?.data?.subscription_active){
      if(data?.data?.active_tabs){
        setNavigationLinks(() => {
          return data.data.active_tabs.map(tab => ({
            label: tab as unknown as string,
            destination: linkDictionary[tab]
          }))
        })
      }
    }
  }, [data?.data?.active_tabs, showPlans?.data]);
  useEffect(() => {
    if (!isReady) return;

    const urlParams = new URLSearchParams(window.location.search);
    const host = urlParams.get("host");
    const shop = urlParams.get("shop");

    if (!host) {
      setAppBridgeError("Missing host parameter");
      return;
    }

    if (!shop) {
      setAppBridgeError("Missing shop parameter");
      return;
    }

    try {
      const config = {
        apiKey: SHOPIFY_API_KEY,
        host: host,
        forceRedirect: true,
      };

      setAppBridgeConfig(config);
      setAppBridgeError(undefined);
    } catch (error) {
      console.error("App Bridge config error:", error);
      setAppBridgeError("Failed to configure App Bridge");
    }
  }, [isReady]);
  if (!isEmbedded) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  if (appBridgeError) {
    return <AppBridgeError appBridgeError={appBridgeError} />;
  }
  if (!appBridgeConfig) {
    return <AppBridgeErrorContainer />;
  }

  return (
    <BrowserRouter>
      <AppBridgeProvider config={appBridgeConfig}>
        <NavigationMenu
          navigationLinks={navigationLinks}
          matcher={(link, location) =>
            link.destination === (location as any)?.pathname
          }
        />
        <ShowPlansManager value={{ showPlans: !!showPlans?.data?.subscription_active, refetch}}>
          {children}
        </ShowPlansManager>
      </AppBridgeProvider>
    </BrowserRouter>
  );
};
export default ShopifyProvider;
