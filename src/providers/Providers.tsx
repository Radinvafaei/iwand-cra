'use client';
import PolarisProviders from './PolarisProvider';
import type {FC, PropsWithChildren} from "react";
import ShopifyProvider from "./ShopifyProvider";
import QueryProvider from "./QueryProvider";

const Providers: FC<PropsWithChildren> = ({
  children,
}) => (
    <ShopifyProvider>
        <QueryProvider>
          <PolarisProviders>
            {children}
          </PolarisProviders>
        </QueryProvider>
    </ShopifyProvider>
);
export default Providers;
