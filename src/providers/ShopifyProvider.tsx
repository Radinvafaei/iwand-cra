import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { IConfig, IShowPlansManagerContext } from "./interface";
import { BrowserRouter } from "react-router-dom";

import AppBridgeError from "../components/ErrorComponents/AppBridgeError";
import AppBridgeErrorContainer from "../components/ErrorComponents/AppBridgeConfigError";
import { useGetActiveTabs, useShowPlans } from "../service/hooks";
import useGetShopName from "../hooks/useGetShopName";
import useEmbedding from "./useEmbedding";
import { NavMenu } from "@shopify/app-bridge-react";
import { setAppConfig } from "./appProvider";

const SHOPIFY_API_KEY = process.env.REACT_APP_APP_KEY!;

const ShowPlansManager = createContext<IShowPlansManagerContext>(
  {} as IShowPlansManagerContext
);
export const useShowPlansManager = () => useContext(ShowPlansManager);

const ShopifyProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isReady, isEmbedded } = useEmbedding();
  const [appBridgeConfig, setAppBridgeConfig] = useState<IConfig>();
  const [appBridgeError, setAppBridgeError] = useState<string>();
  const name = useGetShopName();
  const { refetch: active_tabs_refetch, data: active_tabs } = useGetActiveTabs(
    name || "wand-test-store"
  );

  const {
    data,
    refetch: plans_refetch,
    isLoading,
  } = useShowPlans(name || "wand-test-store");

  const [navigationLinks, setNavigationLinks] = useState<boolean>(false);

  useEffect(() => {
    if (data?.data?.subscription_active) {
      setNavigationLinks(true);
    }
  }, [data?.data]);

  const urlParams = new URLSearchParams(window.location.search);
  const host = urlParams.get("host");
  const shop = urlParams.get("shop");
  useEffect(() => {
    if (!isReady) return;

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
      setAppConfig({
        apiKey: SHOPIFY_API_KEY,
        host: host,
      });
      plans_refetch();
      active_tabs_refetch();
    } catch (error) {
      console.error("App Bridge config error:", error);
      setAppBridgeError("Failed to configure App Bridge");
    }
  }, [isReady]);

  return (
    <BrowserRouter>
      <ShowPlansManager.Provider
        value={{
          show_plans: !!data?.data?.subscription_active,
          active_tabs: active_tabs?.data?.active_tabs || [],
          isLoading,
          plans_refetch: plans_refetch,
          active_tabs_refetch,
          app: { apiKey: SHOPIFY_API_KEY, host: host! },
        }}
      >
        {(() => {
          if (!isEmbedded) {
            return children;
          }
          if (appBridgeError) {
            return <AppBridgeError appBridgeError={appBridgeError} />;
          }
          if (!appBridgeConfig) {
            return <AppBridgeErrorContainer />;
          }
          return (
            <>
              <NavMenu>
                {navigationLinks && (
                  <>
                    <a href="/">Dashboard</a>
                    <a href="/plans">Plans</a>
                    <a href="/customization">Customization</a>
                    <a href="/testing">Testing</a>
                  </>
                )}
              </NavMenu>

              {children}
            </>
          );
        })()}
      </ShowPlansManager.Provider>
    </BrowserRouter>
  );
};
export default ShopifyProvider;
