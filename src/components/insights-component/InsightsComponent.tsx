'use client';
import { Card, InlineStack, Text } from '@shopify/polaris';
import {
  CartFilledIcon,
  MoneyIcon,
  RefreshIcon,
  ChannelsIcon,
} from '@shopify/polaris-icons';
import InsightCard from 'src/components/insights-component/InsightsCard';
import { InsightsFilter } from 'src/components/insights-component/insight-filter';
import type {FC} from "react";

const InsightsComponent: FC = () => {
  const insightsData = [
    {
      title: 'Revenue',
      primaryValue: '$0.0',
      secondaryValue: '$0.0',
      iconSource: MoneyIcon,
      tooltipContent: 'Revenue generated with iWAND vs original.',
      iconColor: '#5C59E8',
      backgroundColor: '#DEDEFA',
    },
    {
      title: 'Conversion Rate',
      primaryValue: '0',
      secondaryValue: '0',
      iconSource: CartFilledIcon,
      tooltipContent: 'Conversion rate improvement.',
      iconColor: '#21C281',
      backgroundColor: '#CEFFEB',
    },
    {
      title: 'Retention Rate',
      primaryValue: '0',
      secondaryValue: '0',
      iconSource: RefreshIcon,
      tooltipContent: 'Customer retention metrics.',
      iconColor: '#E46A11',
      backgroundColor: '#FAE1CF',
    },
    {
      title: 'AOV',
      primaryValue: '$0.0',
      secondaryValue: '$0.0',
      iconSource: ChannelsIcon,
      tooltipContent: 'Average order value.',
      iconColor: '#07A1D0',
      backgroundColor: '#CFECFA',
    },
  ];

  const handleFilterChange = (selected: string) => {
    console.log('Selected filter:', selected);
  };

  return (
    <Card padding="400">
      <InlineStack gap="400" align="space-between" blockAlign="center">
        <Text as="h2" variant="headingLg">
          Insights
        </Text>
        <InsightsFilter onChange={handleFilterChange} />
      </InlineStack>
      <InlineStack gap="400" align="start" blockAlign="start">
        {insightsData.map((data, index) => (
          <div key={index} style={{ flex: '1', paddingBlock: '24px' }}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-expect-error*/}
            <InsightCard {...data} />
          </div>
        ))}
      </InlineStack>
    </Card>
  );
};

export default InsightsComponent;
