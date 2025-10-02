import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { createApp, type ClientApplication } from "@shopify/app-bridge";
import { useShowPlansManager } from "src/providers/ShopifyProvider";

export default function useShopifyRedirect() {
  const { app } = useShowPlansManager();

  return (path: string) => {
    const redirect = Redirect.create(createApp(app));
    redirect.dispatch(Redirect.Action.APP, path);
  };
}
