'use client';

import { type FC } from 'react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Box,
  Bleed,
  Icon,

} from '@shopify/polaris';
import { type AgentBaseCardProps } from './interface';

const AgentBaseCard: FC<AgentBaseCardProps> = ({
  icon,
  title,
  description,
  iconColor,
}) => {
  return (
    <>
      <Card roundedAbove="lg">
        <BlockStack gap="200">
          <InlineStack gap="300" blockAlign="center">
            {icon && (
              <Box>
                <div
                  style={{
                    color: iconColor,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <Icon source={icon} />
                </div>
              </Box>
            )}
            <Text as="h3" variant="headingMd" fontWeight="semibold">
              {title}
            </Text>
          </InlineStack>

          <Bleed marginBlockEnd="200" marginInline="200">
            <Box padding="400">
              <BlockStack gap="300">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="p" variant="bodyMd" tone="subdued">
                    {description}
                  </Text>
                </InlineStack>
              </BlockStack>
            </Box>
          </Bleed>
        </BlockStack>
      </Card>
    </>
  );
};

export default AgentBaseCard;
