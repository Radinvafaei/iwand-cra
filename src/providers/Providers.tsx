'use client';
import PolarisProviders from './PolarisProvider';
import type {FC, PropsWithChildren} from "react";
import ShopifyProvider from "./ShopifyProvider";

const Providers: FC<PropsWithChildren> = ({
  children,
}) => (
    <ShopifyProvider>
      <PolarisProviders>
        {children}
      </PolarisProviders>
    </ShopifyProvider>
);
export default Providers;
