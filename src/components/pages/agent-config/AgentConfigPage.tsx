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
import {type FC, useState, useMemo, useCallback} from 'react';
import SupportButton from 'src/components/support-button/SupportButton';
import { AgentConfigCard } from 'src/components/cards/agent-config-card';
import { AgentSectionHeader } from 'src/components/agent-section-header';
import { AgentBaseCard } from 'src/components/cards/agent-base-card';
import { useQueryClient } from '@tanstack/react-query';
import useGetShopName from "../../../hooks/useGetShopName";
import {useGetAgentsConfig, usePostAgentConfigToggle, usePostAgentConfigToggleWidget} from "../../../service/hooks";
import {mockAgentData} from "./agent-config-mock";
import {IPostAgentConfigTogglePayload, IPostAgentConfigToggleWidgetPayload} from "../../../service/interface";

const AgentConfigPage: FC = () => {
  const shop = useGetShopName();
  const queryClient = useQueryClient();
  const { data} = useGetAgentsConfig(shop || '');
  const [modalActive, setModalActive] = useState(false);
  const [bulkAction, setBulkAction] = useState<{type: 'general' | 'product', action: 'activate' | 'deactivate'} | null>(null);

  const agentToggleMutation = usePostAgentConfigToggle({
    shop: '',
    agent_name: '',
    action: 'activate'
  });

  const widgetToggleMutation = usePostAgentConfigToggleWidget({
    shop: '',
    action: 'activate'
  });

  const processedAgents = useMemo(() => {
    if (!data?.data) return { generalAgents: [], productAgents: [] };

    const agentConfig = data.data;

    const convertAgentsObject = (agentsObj: any, defaultIconColor = '#5C59E8') => {
      return Object.entries(agentsObj).map(([key, agent]: [string, any]) => ({
        id: key,
        title: agent.name,
        description: agent.description,
        icon: agent.icon,
        isActivated: agent.activated,
        lastUpdated: agent.last_updated,
        iconColor: defaultIconColor,
      }));
    };

    return {
      generalAgents: convertAgentsObject(agentConfig.general_agents, '#5C59E8'),
      productAgents: convertAgentsObject(agentConfig.product_agents, '#21C281'),
      widgetActivated: agentConfig.widget_activated,
    };
  }, [data]);

  const handleToggleAgent = useCallback(async (agentId: string, agentType: 'general' | 'product') => {
    if (!shop) return;

    const agents = agentType === 'general' ? processedAgents.generalAgents : processedAgents.productAgents;
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const action: 'activate' | 'deactivate' = agent.isActivated ? 'deactivate' : 'activate';

    try {
      const payload: IPostAgentConfigTogglePayload = {
        shop,
        agent_name: agentId,
        action
      };
      // @ts-ignore
      await agentToggleMutation.mutateAsync(payload);
      await queryClient.invalidateQueries({ queryKey: ['agents-config', shop] });

    } catch (error) {
      console.error('error toggle agent:', error);
    }
  }, [shop, processedAgents, agentToggleMutation, queryClient]);

  const handleBulkAction = useCallback(async (agentType: 'general' | 'product', action: 'activate' | 'deactivate') => {
    if (!shop) return;

    const agents = agentType === 'general' ? processedAgents.generalAgents : processedAgents.productAgents;
    const agentsToUpdate = agents.filter(agent =>
        action === 'activate' ? !agent.isActivated : agent.isActivated
    );

    try {
      const togglePromises = agentsToUpdate.map(agent => {
        const payload: IPostAgentConfigTogglePayload = {
          shop,
          agent_name: agent.id,
          action
        };
        // @ts-ignore
        return agentToggleMutation.mutateAsync(payload);
      });

      await Promise.all(togglePromises);
      await queryClient.invalidateQueries({ queryKey: ['agents-config', shop] });
    } catch (error) {
      console.error('error widget action:', error);
    }
  }, [shop, processedAgents, agentToggleMutation, queryClient]);

  const handleDeactivateAll = useCallback((agentType: 'general' | 'product') => {
    setBulkAction({ type: agentType, action: 'deactivate' });
    setModalActive(true);
  }, []);

  const handleActivateAll = useCallback((agentType: 'general' | 'product') => {
    handleBulkAction(agentType, 'activate');
  }, [handleBulkAction]);

  const handleConfirmBulkAction = useCallback(async () => {
    if (bulkAction) {
      await handleBulkAction(bulkAction.type, bulkAction.action);
    }
    setModalActive(false);
    setBulkAction(null);
  }, [bulkAction, handleBulkAction]);

  const toggleModalActive = useCallback(() => {
    setModalActive(!modalActive);
    setBulkAction(null);
  }, [modalActive]);

  const handleToggleWidget = useCallback(async () => {
    if (!shop) return;

    const action: 'activate' | 'deactivate' = processedAgents.widgetActivated ? 'deactivate' : 'activate';

    try {
      const payload: IPostAgentConfigToggleWidgetPayload = {
        shop,
        action
      };
      // @ts-ignore
      await widgetToggleMutation.mutateAsync(payload);
      await queryClient.invalidateQueries({ queryKey: ['agents-config', shop] });
    } catch (error) {
      console.error('error toggle widget:', error);
    }
  }, [shop, processedAgents.widgetActivated, widgetToggleMutation, queryClient]);

  const { generalAgents, productAgents, widgetActivated } = processedAgents;

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
              <Button
                  variant={widgetActivated ? "primary" : "secondary"}
                  size="large"
                  onClick={handleToggleWidget}
                  loading={widgetToggleMutation.isPending}
                  disabled={widgetToggleMutation.isPending}
              >
                {widgetActivated ? 'Deactivate AI Stylist' : 'Activate AI Stylist'}
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
                    onDeactivateAll={() => handleDeactivateAll('general')}
                    onActivateAll={() => handleActivateAll('general')}
                    totalCount={generalAgents.length}
                />
                <InlineGrid columns={{ xs: 1, sm: 2, md: 2, lg: 2 }} gap="400">
                  {generalAgents.map((agent) => (
                      <AgentConfigCard
                          key={agent.id}
                          icon={agent.icon}
                          iconColor={agent.iconColor}
                          title={agent.title}
                          description={agent.description}
                          isActivated={agent.isActivated}
                          onDeactivate={() => handleToggleAgent(agent.id, 'general')}
                          onActivate={() => handleToggleAgent(agent.id, 'general')}
                      />
                  ))}
                </InlineGrid>
              </BlockStack>
            </Layout.Section>
            <Layout.Section>
              <BlockStack gap="400">
                <AgentSectionHeader
                    title="Product Agents"
                    onDeactivateAll={() => handleDeactivateAll('product')}
                    onActivateAll={() => handleActivateAll('product')}
                    totalCount={productAgents.length}
                />
                <InlineGrid columns={{ xs: 1, sm: 2, md: 2, lg: 2 }} gap="400">
                  {productAgents.map((agent) => (
                      <AgentConfigCard
                          key={agent.id}
                          icon={agent.icon}
                          iconColor={agent.iconColor}
                          title={agent.title}
                          description={agent.description}
                          isActivated={agent.isActivated}
                          onDeactivate={() => handleToggleAgent(agent.id, 'product')}
                          onActivate={() => handleToggleAgent(agent.id, 'product')}
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
                {mockAgentData.map((agent) => (
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
              content: bulkAction ? `${bulkAction.action === 'activate' ? 'Activate' : 'Deactivate'} All` : 'Confirm',
              onAction: handleConfirmBulkAction,
              destructive: bulkAction?.action === 'deactivate',
              loading: agentToggleMutation.isPending,
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
                {bulkAction?.action === 'deactivate'
                    ? 'Deactivating agents will disable their functionality on your website, but you can reactivate them anytime.'
                    : 'Activating agents will enable their functionality on your website.'
                }
              </Text>
            </BlockStack>
          </Modal.Section>
        </Modal>
      </>
  );
};
export default AgentConfigPage;
