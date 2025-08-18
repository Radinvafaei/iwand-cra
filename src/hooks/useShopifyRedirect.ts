import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import type { ClientApplication } from "@shopify/app-bridge";

export default function useShopifyRedirect() {
  const app = useAppBridge() as unknown as ClientApplication;

  return (path: string) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.APP, path);
  };
}
