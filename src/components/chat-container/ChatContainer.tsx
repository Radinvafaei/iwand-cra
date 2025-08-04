'use client';

import {type FC } from 'react';
import {
  Card,
  Text,
  Badge,
  Box,
  InlineStack,
  BlockStack,
  Divider,
} from '@shopify/polaris';
import type {ChatContainerProps} from './interface';
import { ProductCard } from 'src/components/cards/product-card';

const ChatContainer: FC<ChatContainerProps> = ({
  messages,
  status,
  productInfo,
  agentName,
  products,
  date,
}) => {
  return (
    <Card padding="0">
      <Box>
        <div
          style={{
            backgroundColor: '#F6EBFF',
            padding: '16px',
            borderRadius: '8px 8px 0 0',
            textAlign: 'center',
          }}
        >
          <Text variant="headingMd" as="h2">
            {agentName || 'Chat Agent'}
          </Text>
        </div>
      </Box>

      <Box
        minHeight="400px"
        padding="400"
        overflowY="scroll"
        background="bg-surface"
      >
        <BlockStack gap="400">
          <Box>
            <InlineStack align="center">
              <Badge tone="enabled" size="large">
                {date}
              </Badge>
            </InlineStack>
          </Box>

          {messages.map((message) => (
            <Box key={message.id}>
              {message.sender === 'agent' && (
                <Box>
                  <div
                    style={{
                      backgroundColor: 'white',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      maxWidth: '70%',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Text variant="bodyMd" as="p">
                      {message.text}
                    </Text>
                  </div>
                </Box>
              )}
              {message.sender === 'user' && (
                <Box>
                  <InlineStack align="end">
                    <div
                      style={{
                        backgroundColor: '#5C59E8',
                        color: '#FFFFFF',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        maxWidth: '70%',
                      }}
                    >
                      <Text variant="bodyMd" as="p" tone="text-inverse">
                        {message.text}
                      </Text>
                    </div>
                  </InlineStack>
                </Box>
              )}
            </Box>
          ))}

          {products && products.length > 0 && (
            <Box paddingBlockStart="400">
              <InlineStack gap="300" wrap>
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    title={product.title}
                    styleName={product.styleName}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    onClick={() =>
                      console.log('Product clicked:', product.title)
                    }
                  />
                ))}
              </InlineStack>
            </Box>
          )}
        </BlockStack>
      </Box>

      {status && (
        <div style={{ marginTop: '10px' }}>
          <Divider />
          <div
            style={{
              width: 'full',
              padding: '20px',
              backgroundColor: `${status === 'viewed' ? '#EBF8FF' : '#EBFFEF'}`,
            }}
          >
            <InlineStack gap="300" align="center">
              {productInfo?.image && (
                <Box>
                  <img
                    src={productInfo.image}
                    alt={productInfo.name}
                    width={40}
                    height={40}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              )}

              <BlockStack gap="100">
                <Badge tone={status === 'purchased' ? 'success' : 'enabled'}>
                  {status === 'purchased' ? 'Purchased' : 'Viewed product'}
                </Badge>
                {productInfo?.name && (
                  <Text variant="bodySm" as="p">
                    {productInfo.name}
                  </Text>
                )}
              </BlockStack>
            </InlineStack>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ChatContainer;
