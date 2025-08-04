'use client';
import {
  Text,
  Layout,
  InlineStack,
  BlockStack,
  Button,
  Box,
  Page,
  InlineGrid,
  Modal,
} from '@shopify/polaris';
import {type FC, useState} from 'react';
import SupportButton from 'src/components/support-button/SupportButton';
import { AgentConfigCard } from 'src/components/cards/agent-config-card';
import { mockAgentData } from './agent-config-mock';
import { AgentSectionHeader } from 'src/components/agent-section-header';
import { AgentBaseCard } from 'src/components/cards/agent-base-card';

const AgentConfigPage: FC = () => {
  const [agents, setAgents] = useState(mockAgentData);
  const [modalActive, setModalActive] = useState(false);

  const handleToggleAgent = (agentId: number) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === agentId
          ? { ...agent, isActivated: !agent.isActivated }
          : agent,
      ),
    );
  };

  const handleDeactivateAll = () => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) => ({ ...agent, isActivated: false })),
    );
    setModalActive(false);
  };

  const handleActivateAll = () => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) => ({ ...agent, isActivated: true })),
    );
  };

  const toggleModalActive = () => setModalActive(!modalActive);

  const handleDeactivateAllClick = () => {
    setModalActive(true);
  };

  return (
    <>
      <div
        style={{
          padding: '2rem 3rem',
          color: 'white',
        }}
      >
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="200">
            <Text as="h3" variant="headingXl" tone="base">
              Agent Configuration
            </Text>
          </BlockStack>
          <InlineStack gap="100">
            <Button variant="primary" size="large">
              Deactivate AI Stylist
            </Button>
          </InlineStack>
        </InlineStack>
      </div>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <BlockStack gap="400">
              <AgentSectionHeader
                title="General Agents"
                onDeactivateAll={handleDeactivateAllClick}
                onActivateAll={handleActivateAll}
                totalCount={agents.length}
              />
              <InlineGrid columns={{ xs: 1, sm: 2, md: 2, lg: 2 }} gap="400">
                {agents.map((agent) => (
                  <AgentConfigCard
                    key={agent.id}
                    icon={agent.icon}
                    iconColor={agent.iconColor}
                    title={agent.title}
                    description={agent.description}
                    isActivated={agent.isActivated}
                    onDeactivate={() => handleToggleAgent(agent.id)}
                    onActivate={() => handleToggleAgent(agent.id)}
                  />
                ))}
              </InlineGrid>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <AgentSectionHeader
                title="Product Agents"
                onDeactivateAll={handleDeactivateAllClick}
                onActivateAll={handleActivateAll}
                totalCount={agents.length}
              />
              <InlineGrid columns={{ xs: 1, sm: 2, md: 2, lg: 2 }} gap="400">
                {agents.map((agent) => (
                  <AgentConfigCard
                    key={agent.id}
                    icon={agent.icon}
                    iconColor={agent.iconColor}
                    title={agent.title}
                    description={agent.description}
                    isActivated={agent.isActivated}
                    onDeactivate={() => handleToggleAgent(agent.id)}
                    onActivate={() => handleToggleAgent(agent.id)}
                  />
                ))}
              </InlineGrid>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <div
              style={{
                padding: '1rem 2rem',
                color: 'white',
              }}
            >
              <BlockStack gap="100">
                <Text as="h3" variant="headingXl" tone="base">
                  Coming Soon Agents
                </Text>
              </BlockStack>
            </div>
            <InlineGrid columns={{ xs: 1, sm: 2, md: 4, lg: 4 }} gap="400">
              {agents.map((agent) => (
                <AgentBaseCard
                  key={agent.id}
                  icon={agent.icon}
                  iconColor={agent.iconColor}
                  title={agent.title}
                  description={agent.description}
                />
              ))}
            </InlineGrid>
          </Layout.Section>

          <Box paddingBlockStart="600">
            <SupportButton />
          </Box>
        </Layout>
      </Page>

      <Modal
        open={modalActive}
        onClose={toggleModalActive}
        title="Deactivate Widget"
        primaryAction={{
          content: 'Deactivate All',
          onAction: handleDeactivateAll,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: toggleModalActive,
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="100">
            <Text as="p">
              Are you sure you want to deactivate the entire agent?
            </Text>
            <Text as="p" tone="subdued">
              Deactivating the widget will hide it from your website, but you
              can reactivate it anytime.
            </Text>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </>
  );
};
export default AgentConfigPage;
