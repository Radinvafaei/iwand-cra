import {FC, PropsWithChildren, useEffect, useState} from "react";
import {IConfig} from "./interface";
import {BrowserRouter} from "react-router-dom";
import { Provider as AppBridgeProvider, NavigationMenu } from '@shopify/app-bridge-react';
import AppBridgeError from "../components/ErrorComponents/AppBridgeError";
import AppBridgeErrorContainer from "../components/ErrorComponents/AppBridgeConfigError";
const SHOPIFY_API_KEY = "be32a232bb533bbe2c475cc64ff75777";
const useEmbedding = () => {
    const [isEmbedded, setIsEmbedded] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const shop = urlParams.get('shop');
        const embedded = urlParams.get('embedded') === '1';
        const inIframe = window.top !== window.self;

        setIsEmbedded(!!(inIframe && (embedded || shop)));
        setIsReady(true);
    }, []);

    return { isEmbedded, isReady };
};

const ShopifyProvider: FC<PropsWithChildren> = ({ children }) => {
    const { isReady, isEmbedded } = useEmbedding();
    const [appBridgeConfig, setAppBridgeConfig] = useState<IConfig>();
    const [appBridgeError, setAppBridgeError] = useState<string>();
    useEffect(() => {
        if (!isReady) return;

        const urlParams = new URLSearchParams(window.location.search);
        const host = urlParams.get('host');
        const shop = urlParams.get('shop');

        if (!host) {
            setAppBridgeError('Missing host parameter');
            return;
        }

        if (!shop) {
            setAppBridgeError('Missing shop parameter');
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
            console.error('App Bridge config error:', error);
            setAppBridgeError('Failed to configure App Bridge');
        }
    }, [isReady]);
    if (!isEmbedded) {
        return (
            <BrowserRouter>
                {children}
            </BrowserRouter>
        );
    }
    if (appBridgeError) {
        return (
            <AppBridgeError appBridgeError={appBridgeError} />
        );
    }
    if(!appBridgeConfig){
        return <AppBridgeErrorContainer />
    }

    return (
        <BrowserRouter>
            <AppBridgeProvider config={appBridgeConfig}>
                <NavigationMenu
                    navigationLinks={[
                        {
                            label: 'Dashboard',
                            destination: '/',
                        },
                        {
                            label: 'Settings',
                            destination: '/settings',
                        },
                    ]}
                    matcher={(link, location) => link.destination === (location as any)?.pathname}
                />
                {children}
            </AppBridgeProvider>
        </BrowserRouter>
    )
}
export default ShopifyProvider;