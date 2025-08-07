'use client';

import { ChatCard } from 'src/components/cards/chat-card';
import {type FC, useState} from 'react';
import { ChatContainer, type Message } from 'src/components/chat-container';
import { PurchasedCard } from 'src/components/cards/purchased-card';
import { InfoCard } from 'src/components/cards/info-card';
import { Divider, BlockStack, Text, Box } from '@shopify/polaris';
import { mockProducts, initialMessages, mockChats } from './mock-date';
import SupportButton from 'src/components/support-button/SupportButton';
import {useGetConversations} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import {conversationConvertor} from "./convertor";


const ConversationPage: FC = () => {
  const [selectedChat, setSelectedChat] = useState<number>(0);
  const shop = useGetShopName();
  const { data } = useGetConversations({shop: shop || 'test'});
  // const [messages, setMessages] = useState<Record<number, Message[]>>(initialMessages);
  const convertedData = conversationConvertor(data?.data?.conversations[selectedChat]?.messages)
    console.log({ convertedData })
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
          height: '100vh',
          zIndex: 10,
        }}
      >
        {data?.data?.conversations.map((chat, i) => (
          <div key={chat.id} onClick={() => setSelectedChat(i)}>
            <ChatCard
              username={chat.user.name}
              message={chat.messages[0]?.content}
              messageTime={chat.last_activity}
              messageCount={chat.total_messages}
              selected={selectedChat === i}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          padding: '16px',
          overflowY: 'auto',
          gap: '16px',
        }}
      >
          {convertedData.map(chatData => (
              <div key={chatData.id} style={{ width: '100%', maxWidth: '800px' }}>
                  <ChatContainer
                      {...chatData}
                  />
              </div>
          ))}
        {/*{convertedData.map((chatData) => (
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
        ))}*/}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center',
          height: '100vh',
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
