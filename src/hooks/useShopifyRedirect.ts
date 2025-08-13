import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from '@shopify/app-bridge-react';

export default function useShopifyRedirect() {
    const app = useAppBridge();

    return (path: string) => {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, path);
    };
}