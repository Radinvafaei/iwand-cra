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
import {
  Provider as AppBridgeProvider,
  NavigationMenu,
} from "@shopify/app-bridge-react";
import AppBridgeError from "../components/ErrorComponents/AppBridgeError";
import AppBridgeErrorContainer from "../components/ErrorComponents/AppBridgeConfigError";
import { useGetActiveTabs, useShowPlans } from "../service/hooks";
import useGetShopName from "../hooks/useGetShopName";
import { NavigationLink } from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import useEmbedding from "./useEmbedding";
const SHOPIFY_API_KEY = "be32a232bb533bbe2c475cc64ff75777";

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
  useEffect(() => {
    console.log(active_tabs);
  }, [active_tabs]);

  const {
    data,
    refetch: plans_refetch,
    isLoading,
  } = useShowPlans(name || "wand-test-store");
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([]);
  useEffect(() => {
    if (data?.data?.subscription_active) {
      setNavigationLinks([
        {
          label: "Dashboard",
          destination: "/",
        },
        {
          label: "Plans",
          destination: "/plans",
        },
        {
          label: "Customization",
          destination: "/customization",
        },
        {
          label: "Testing",
          destination: "/testing",
        },
      ]);
    }
  }, [data?.data]);
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

  return (
    <BrowserRouter>
      <ShowPlansManager.Provider
        value={{
          show_plans: !!data?.data?.subscription_active,
          active_tabs: active_tabs?.data?.active_tabs || [],
          isLoading,
          plans_refetch,
          active_tabs_refetch,
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
            <AppBridgeProvider config={appBridgeConfig}>
              <NavigationMenu
                navigationLinks={navigationLinks}
                matcher={(link, location) =>
                  link.destination === (location as any)?.pathname
                }
              />
              {children}
            </AppBridgeProvider>
          );
        })()}
      </ShowPlansManager.Provider>
    </BrowserRouter>
  );
};
export default ShopifyProvider;
