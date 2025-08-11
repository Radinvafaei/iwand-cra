'use client';
import {type FC } from 'react';
import type {AiStyleCardProps} from './interface';
import {
  InlineStack,
  BlockStack,
  Text,
  Icon,
  Spinner,
  Button,
  Divider,
} from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';
import {useGetProductsProcessed} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";

const AiStyleCard: FC<AiStyleCardProps> = ({
  title,
  status,
  progressMessage,
  subtitle,
  completedMessage,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minInlineSize: '340px',
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: '#DEDEFA',
        borderRadius: '1rem',
        padding: '20px',
      }}
    >
      <BlockStack gap="200">
        <Text as="h3" variant="headingMd" fontWeight="bold">
          {title}
        </Text>

        {status === 'in-progress' ? (
          <>
            <InlineStack gap="200" align="start" blockAlign="center">
              <div
                style={{
                  minWidth: '24px',
                  minHeight: '24px',
                  borderRadius: '50%',
                }}
              >
                <Spinner accessibilityLabel="Loading" size="small" />
              </div>
              <p style={{ color: '#844AFF', fontStyle: 'italic' }}>
                {progressMessage}
              </p>
            </InlineStack>

            <Divider />
            <Text as="p" variant="bodySm" tone="subdued">
              {subtitle}
            </Text>
          </>
        ) : (
          <>
            <BlockStack>
              <BlockStack align="start" inlineAlign="start" gap="400">
                <div
                  style={{
                    display: 'flex',
                    color: '#00BF6F',
                    fontStyle: 'italic',
                  }}
                >
                  <Icon source={CheckIcon} accessibilityLabel="Completed" />
                  {completedMessage}
                </div>
              </BlockStack>
            </BlockStack>

            <InlineStack align="end">
              <Button
                external
                onClick={onButtonClick}
                size="large"
                variant="primary"
              >
                {buttonText}
              </Button>
            </InlineStack>
          </>
        )}
      </BlockStack>
    </div>
  );
};

export default AiStyleCard;
