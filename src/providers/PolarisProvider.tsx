'use client';
import {AppProvider, Frame} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import React, {type ReactNode} from 'react';


const PolarisProviders = ({ children }: { children: ReactNode }) => {

  return (
      <AppProvider i18n={enTranslations}>
          <Frame>
            {children}
          </Frame>
      </AppProvider>
  );
};
export default PolarisProviders;
