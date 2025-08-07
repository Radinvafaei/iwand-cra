'use client';

import type {FC} from 'react';
import { Text } from '@shopify/polaris';
import type {ChatCardProps} from './interface';

const ChatCard: FC<ChatCardProps> = ({
  username,
  messageCount,
  messageTime,
  message,
  selected = false,
  onClick,
}) => {
  const cardStyles = {
    width: '212px',
    minHeight: '54px',
    display: 'flex',
    flexDirection: 'column' as const,
    border: selected ? '1px solid #BE95FF' : '1px solid #E3E3E3',
    borderRadius: '8px',
    backgroundColor: selected ? '#F6EBFF' : '#FFFFFF',
    padding: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const messageCountStyles = {
    minWidth: '16px',
    height: '16px',
    display: 'flex',
    backgroundColor: '#E84343',
    color: '#FFFFFF',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '600',
    padding: '0 4px',
  };

  return (
    <div style={cardStyles} onClick={onClick}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <Text as="p" variant="bodyMd" fontWeight="semibold">
          {username}
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          {messageTime}
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Text as="p" variant="bodySm" truncate>
          {message}
        </Text>
        {messageCount > 0 && (
          <div style={messageCountStyles}>{messageCount}</div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
