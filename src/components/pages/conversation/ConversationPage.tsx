'use client';

import { ChatCard } from 'src/components/cards/chat-card';
import {type FC, useState} from 'react';
import { ChatContainer, type Message } from 'src/components/chat-container';
import { PurchasedCard } from 'src/components/cards/purchased-card';
import { InfoCard } from 'src/components/cards/info-card';
import { Divider, BlockStack, Text, Box } from '@shopify/polaris';
import { mockProducts, initialMessages, mockChats } from './mock-date';
import SupportButton from 'src/components/support-button/SupportButton';


const ConversationPage: FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);

  const [messages, setMessages] =
    useState<Record<number, Message[]>>(initialMessages);

  const selectedChatData = mockChats.find((chat) => chat.id === selectedChat);

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          backgroundColor: 'white',
          paddingBlock: '16px',
          overflowY: 'auto',
          alignItems: 'center',
          borderRight: '1px solid #E3E3E3',
          height: 'calc(100vh - 64px)',
          zIndex: 10,
        }}
      >
        {mockChats.map((chat) => (
          <div key={chat.id} onClick={() => setSelectedChat(chat.id)}>
            <ChatCard
              username={chat.username}
              message={chat.message}
              messageTime={chat.messageTime}
              messageCount={chat.messageCount}
              selected={selectedChat === chat.id}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          height: 'calc(100vh - 64px)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          padding: '16px',
          overflowY: 'auto',
          gap: '16px',
        }}
      >
        {mockChats.map((chatData) => (
          <div key={chatData.id} style={{ width: '100%', maxWidth: '800px' }}>
            <ChatContainer
              messages={messages[chatData.id] || []}
              status={chatData.status}
              productInfo={chatData.productInfo}
              agentName={chatData.agentName}
              products={chatData.showProducts ? mockProducts : undefined}
              date={chatData.date}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          width: '265px',
          backgroundColor: 'var(--p-color-bg-surface)',
          borderLeft: '1px solid var(--p-color-border)',
          overflowY: 'auto',
          zIndex: 10,
        }}
      >
        <Box padding="400">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h3">
              Details
            </Text>
            <Divider />

            {selectedChatData?.userInfo && (
              <InfoCard
                name={selectedChatData.userInfo.name}
                email={selectedChatData.userInfo.email}
                phone={selectedChatData.userInfo.phone}
                location={selectedChatData.userInfo.location}
                device={selectedChatData.userInfo.device}
              />
            )}

            {selectedChatData?.purchaseData && (
              <PurchasedCard
                orderID={selectedChatData.purchaseData.orderID}
                date={selectedChatData.purchaseData.date}
                total={selectedChatData.purchaseData.total}
                items={selectedChatData.purchaseData.items}
              />
            )}

            {!selectedChatData?.purchaseData && !selectedChatData?.userInfo && (
              <Box padding="400">
                <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                  No details available
                </Text>
              </Box>
            )}
          </BlockStack>
          <SupportButton />
        </Box>
      </div>
    </div>
  );
};

export default ConversationPage;
