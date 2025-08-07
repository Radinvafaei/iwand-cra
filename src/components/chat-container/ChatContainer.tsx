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
import { ProductCard } from 'src/components/cards/product-card';
import {IAIChats} from "../pages/conversation/convertor";

const ChatContainer: FC<IAIChats> = ({
  messages,
  agent,
  id
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
            {agent}
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
                {messages[0].created_at}
              </Badge>
            </InlineStack>
          </Box>

          {messages.map((message) => (
            <Box key={message.created_at}>
              {message.type === 'bot' && (
                  <><Box>
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
                              {message.content}
                          </Text>
                      </div>
                  </Box>
                      <Box paddingBlockStart="400">
                      <InlineStack gap="300" wrap>
                          {message.products.map((product, index) => (
                              <ProductCard
                                  key={index}
                                  title={product.name}
                                  styleName={product.brand}
                                  imageUrl={product.image_url}
                                  price={product.price}
                                  onClick={() => console.log('Product clicked:', product.name)}/>
                          ))}
                      </InlineStack>
                  </Box></>
              )}
              {message.type === 'user' && (
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
                        {message.content}
                      </Text>
                    </div>
                  </InlineStack>
                </Box>
              )}
            </Box>
          ))}
        </BlockStack>
      </Box>

      {/*{status && (
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
      )}*/}
    </Card>
  );
};

export default ChatContainer;
