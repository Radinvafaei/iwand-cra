'use client';
import React, { useMemo } from 'react';
import {
  Card,
  Text,
  Layout,
  InlineStack,
  BlockStack,
  Button,
  Box,
  Page,
} from '@shopify/polaris';
import { AgentsUsageChart } from 'src/components/agent-usage-chart';
import { DonutChart } from 'src/components/donut-chart';
import SupportButton from 'src/components/support-button/SupportButton';
import { InsightsComponent } from 'src/components/insights-component';
import { AiStyleCard } from 'src/components/cards/ai-style-card';
import { BaseCard } from 'src/components/cards/base-card';
import useGetShopName from "src/hooks/useGetShopName";
import { useGetAgentUsage } from "src/service/hooks";

const DashboardPage = () => {
  const shopName = useGetShopName();
  const { data } = useGetAgentUsage(shopName!);

  const { chartData, chartAgents } = useMemo(() => {
    if (!data?.data?.agents) {
      return { chartData: [], chartAgents: [] };
    }

    const apiResponse = data.data;

    const allDates = new Set<string>();
    apiResponse.agents.forEach(agent => {
      agent.usage.forEach(usage => {
        allDates.add(usage.date);
      });
    });

    const sortedDates = Array.from(allDates).sort();

    const colors = [
      '#8B5CF6',
      '#10B981',
      '#F59E0B',
      '#EF4444',
      '#3B82F6',
      '#EC4899',
      '#06B6D4',
      '#84CC16',
      '#F97316'
    ];

    // Transform agents with proper IDs
    const agents = apiResponse.agents.map((agent, index) => ({
      id: agent.name.toLowerCase().replace(/\s+/g, '-'),
      name: agent.name,
      color: colors[index % colors.length],
    }));

    // Transform data - create chart data points
    const chartData = sortedDates.map(date => {
      const dataPoint: any = {
        date,
        total: 0,
      };

      // Add data for each agent
      apiResponse.agents.forEach(agent => {
        const agentId = agent.name.toLowerCase().replace(/\s+/g, '-');
        const usageForDate = agent.usage.find(usage => usage.date === date);
        const count = usageForDate?.count || 0;
        dataPoint[agentId] = count;
        dataPoint.total += count;
      });

      return dataPoint;
    });

    return { chartData, chartAgents: agents };
  }, [data]);

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    console.log('Date range changed:', range);
  };

  const handleAgentFilterChange = (selectedAgentIds: string[]) => {
    console.log('Selected agents:', selectedAgentIds);
  };

  const handleTestClick = () => console.log('Mock test clicked');

  const donutChartData = [
    { name: 'Used', value: 1980 },
    { name: 'Remaining', value: 20 },
  ];

  return (
      <>
        <div
            style={{
              background: '#2C294B',
              padding: '2rem 3rem',
              color: 'white',
            }}
        >
          <InlineStack align="space-between" blockAlign="center">
            <BlockStack gap="200">
              <Text as="h1" variant="heading2xl" tone="inherit">
                Dashboard
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Welcome Back!
              </Text>
            </BlockStack>
            <InlineStack gap="100">
              <Text as="p" variant="bodySm" tone="inherit">
                Do you have any question?
              </Text>
              <Button variant="primary" size="large">
                Lets Talk
              </Button>
            </InlineStack>
          </InlineStack>
        </div>
        <Page fullWidth>
          <Layout>
            <Layout.Section>
              <Card>
                <Box padding="600">
                  <BlockStack gap="400">
                    <Text as="h2" variant="headingLg">
                      Your AI Stylist is under launch
                    </Text>

                    <InlineStack gap="400" align="start">
                      <AiStyleCard
                          title="AI Stylist"
                          status="in-progress"
                          buttonText="Test it"
                          progressMessage="in progress"
                          subtitle="Product information is gathering"
                          onButtonClick={handleTestClick}
                      />
                      <BaseCard
                          completed={false}
                          title="Customization"
                          completedMessage="completed!"
                          buttonText="Check it"
                          onButtonClick={handleTestClick}
                      />
                      <BaseCard
                          completed
                          title="Widget state"
                          completedMessage="completed!"
                          buttonText="Launch"
                          onButtonClick={handleTestClick}
                      />
                    </InlineStack>
                  </BlockStack>
                </Box>
              </Card>

              <Box paddingBlockStart="600">
                <InsightsComponent />
              </Box>

              <Box paddingBlockStart="600">
                <Layout>
                  <Layout.Section variant="oneHalf">
                    <AgentsUsageChart
                        data={chartData}
                        agents={chartAgents}
                        onDateRangeChange={handleDateRangeChange}
                        onAgentFilterChange={handleAgentFilterChange}
                    />
                  </Layout.Section>

                  <Layout.Section variant="oneThird">
                    <DonutChart
                        title="Conversation Usage"
                        data={donutChartData}
                        maxValue={2000}
                    />
                  </Layout.Section>
                </Layout>
              </Box>

              <Box paddingBlockStart="600">
                <SupportButton />
              </Box>
            </Layout.Section>
          </Layout>
        </Page>
      </>
  );
};

export default DashboardPage;