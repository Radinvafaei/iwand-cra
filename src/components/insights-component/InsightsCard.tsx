'use client';
import type {InsightCardProps} from './interface';
import type {FC} from 'react';
import {
    Card,
    InlineStack,
    BlockStack,
    Icon,
    Text,
    Tooltip,
} from '@shopify/polaris';
import { InfoIcon, ArrowDiagonalIcon } from '@shopify/polaris-icons';

const InsightCard: FC<InsightCardProps> = ({
  title,
  primaryLabel = 'with iWAND',
  primaryValue,
  secondaryLabel = 'Original',
  secondaryValue,
  iconSource,
  tooltipContent = 'Additional info about this metric',
  backgroundColor,
  iconColor,
}) => {
  return (
    <Card>
      <InlineStack align="space-between" blockAlign="start">
        <InlineStack>
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: backgroundColor,
              color: iconColor,
              borderRadius: '50%',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Icon source={iconSource} />
          </div>
        </InlineStack>

        <div
          style={{
            width: '24px',
            height: '24px',
            color: '#844AFF',
            marginBottom: '10px',
          }}
        >
          <Icon source={ArrowDiagonalIcon} />
        </div>
      </InlineStack>

      <BlockStack gap="100">
        <InlineStack gap="100" align="start" blockAlign="center">
          <Text as="h3" variant="headingMd">
            {title}
          </Text>
          <Tooltip content={tooltipContent}>
            <div
              style={{
                width: '24px',
                height: '24px',
                color: '#BE95FF',
              }}
            >
              <Icon source={InfoIcon} />
            </div>
          </Tooltip>
        </InlineStack>
        <Text as="p" variant="bodyMd" fontWeight="bold">
          {primaryLabel}: {primaryValue}
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          {secondaryLabel}: {secondaryValue}
        </Text>
      </BlockStack>
    </Card>
  );
};

export default InsightCard;