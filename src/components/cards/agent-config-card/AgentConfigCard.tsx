'use client';

import { type FC, useState } from 'react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Box,
  Bleed,
  Icon,
  Modal,
} from '@shopify/polaris';
import { type AgentConfigCardProps } from './interface';

const AgentConfigCard: FC<AgentConfigCardProps> = ({
  icon,
  title,
  description,
  isActivated,
  onDeactivate,
  onActivate,
  iconColor,
  onCardDeactivate,
}) => {
  const [modalActive, setModalActive] = useState(false);

  const handleDeactivateClick = () => {
    if (isActivated) {
      setModalActive(true);
    } else {
      onActivate();
    }
  };

  const handleConfirmDeactivate = () => {
    onDeactivate();
    setModalActive(false);
  };

  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <>
      <Card roundedAbove="lg">
        <BlockStack gap="400">
          <InlineStack gap="300" blockAlign="center">
            {icon && (
              <Box>
                <div
                  style={{
                    color: iconColor,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <Icon source={icon} />
                </div>
              </Box>
            )}
            <Text as="h3" variant="headingMd" fontWeight="semibold">
              {title}
            </Text>
          </InlineStack>

          <Text as="p" variant="bodyMd" tone="subdued">
            {description}
          </Text>

          <Bleed marginBlockEnd="400" marginInline="400">
            <Box background="bg-surface-secondary-active" padding="400">
              <BlockStack gap="300">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="p" variant="bodyMd">
                    This agent is {isActivated ? 'activated' : 'deactivated'}.
                  </Text>
                  <Button
                    size="large"
                    onClick={handleDeactivateClick}
                    variant={isActivated ? 'secondary' : 'primary'}
                  >
                    {isActivated ? 'Deactivate' : 'Activate'}
                  </Button>
                </InlineStack>
              </BlockStack>
            </Box>
          </Bleed>
        </BlockStack>
      </Card>

      <Modal
        open={modalActive}
        onClose={handleModalClose}
        title="Confirm Deactivation"
        primaryAction={{
          content: 'Deactivate',
          onAction: handleConfirmDeactivate,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleModalClose,
          },
        ]}
      >
        <Modal.Section>
          <Text as="p">
            Are you sure you want to deactivate the {title} agent? This action
            will stop all automated processes for this agent.
          </Text>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default AgentConfigCard;
