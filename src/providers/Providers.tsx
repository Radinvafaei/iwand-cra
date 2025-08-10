'use client';
import PolarisProviders from './PolarisProvider';
import type {FC, PropsWithChildren} from "react";
import ShopifyProvider from "./ShopifyProvider";
import QueryProvider from "./QueryProvider";

const Providers: FC<PropsWithChildren> = ({
  children,
}) => (
    <QueryProvider>
        <ShopifyProvider>
            <PolarisProviders>
                {children}
            </PolarisProviders>
        </ShopifyProvider>
    </QueryProvider>
);
export default Providers;
