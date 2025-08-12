'use client';
import type {FC} from 'react';
import type {BaseCardProps} from './interface';
import { InlineStack, BlockStack, Text, Icon, Button } from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';
import {Link} from "react-router-dom";

const BaseCard: FC<BaseCardProps> = ({
  title,
  completed,
  completedMessage,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '340px',
        backgroundColor: 'white',
        border: '1px solid',
        alignContent: 'space-between',
        borderColor: '#DEDEFA',
        borderRadius: '1rem',
        padding: '20px',
      }}
    >
      <BlockStack gap={completed ? '200' : '1000'}>
        <Text as="h3" variant="headingMd" fontWeight="bold">
          {title}
        </Text>
        {completed && (
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
          </>
        )}
        <InlineStack align="end">
          <Link to="/customization">
              <Button
                  external
                  onClick={onButtonClick}
                  size="large"
                  variant="primary"
              >
                  {buttonText}
              </Button>
          </Link>
        </InlineStack>
      </BlockStack>
    </div>
  );
};

export default BaseCard;
