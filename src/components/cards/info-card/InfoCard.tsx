'use client';

import type {FC} from 'react';
import { Card, Text, BlockStack, Icon, Box } from '@shopify/polaris';
import {
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  MobileIcon,
  PersonIcon,
} from '@shopify/polaris-icons';
import type {InfoCardProps} from './interface';

const InfoCard: FC<InfoCardProps> = ({
  name,
  email,
  phone,
  location,
  device,
}) => {
  const infoItems = [
    { icon: PersonIcon, value: name },
    { icon: EmailIcon, value: email },
    { icon: PhoneIcon, value: phone },
    { icon: LocationIcon, value: location },
    { icon: MobileIcon, value: device },
  ];

  return (
    <Card padding="0">
      <Box padding="400" background="bg-surface-secondary">
        <Text variant="headingMd" as="h3">
          info
        </Text>
      </Box>

      <Box padding="400">
        <BlockStack gap="300">
          {infoItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <Icon source={item.icon} tone="base" />
              <Text variant="bodyMd" as="p">
                {item.value}
              </Text>
            </div>
          ))}
        </BlockStack>
      </Box>
    </Card>
  );
};

export default InfoCard;
