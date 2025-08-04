'use client';

import type {FC} from 'react';
import {
  Card,
  Text,
  InlineStack,
  BlockStack,
  Divider,
  Box,
} from '@shopify/polaris';
import type {PurchaseCardProps} from './interface';

const PurchasedCard: FC<PurchaseCardProps> = ({
  orderID,
  date,
  total,
  onClick,
  items,
}) => {
  return (
    <Card padding="0">
      <Box padding="400" background="bg-surface-secondary">
        <Text variant="headingMd" as="h3">
          Conversion
        </Text>
      </Box>

      <Box padding="400">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="p" variant="bodyLg" fontWeight="semibold">
              Order #{orderID}
            </Text>
            <Text as="p" variant="bodySm" tone="subdued">
              {date}
            </Text>
          </BlockStack>

          <BlockStack gap="300">
            {items?.map((item, index) => (
              <InlineStack
                key={index}
                align="space-between"
                blockAlign="center"
              >
                <InlineStack gap="300" blockAlign="center">
                  {item.imageUrl && (
                    <div
                      style={{
                        width: '48px',
                        height: '60px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        width={48}
                        height={48}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <Text as="p" variant="bodyMd">
                    {item.name}
                  </Text>
                </InlineStack>
                <Text as="p" variant="bodyMd" fontWeight="semibold">
                  {item.price}
                </Text>
              </InlineStack>
            ))}
          </BlockStack>

          <Divider />

          <InlineStack align="space-between">
            <Text as="p" variant="bodyLg" fontWeight="semibold">
              Total
            </Text>
            <Text as="p" variant="bodyLg" fontWeight="semibold">
              {total}
            </Text>
          </InlineStack>
        </BlockStack>
      </Box>
    </Card>
  );
};

export default PurchasedCard;
