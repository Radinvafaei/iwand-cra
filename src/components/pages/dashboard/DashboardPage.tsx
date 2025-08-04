'use client';
import React from 'react';
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
import {useGetAgentUsage} from "src/service/hooks";

const DashboardPage = () => {
  const shopName = useGetShopName();
  const {data} = useGetAgentUsage(shopName!);
  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    console.log('Date range changed:', range);
  };

  const handleAgentFilterChange = (selectedAgentIds: string[]) => {
    console.log('Selected agents:', selectedAgentIds);
  };
  const handleTestClick = () => console.log('Mock test clicked');
  const chartData = [
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
                    onDateRangeChange={handleDateRangeChange}
                    onAgentFilterChange={handleAgentFilterChange}
                  />
                </Layout.Section>

                <Layout.Section variant="oneThird">
                  <DonutChart
                    title="Conversation Usage"
                    data={chartData}
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
