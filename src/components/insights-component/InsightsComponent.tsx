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
import type { FC } from "react";
import { useState } from 'react';
import {TTimePeriods} from "../../service/interface";
import {useGetInsights} from "../../service/hooks";

interface InsightsComponentProps {
  shop: string;
}

const InsightsComponent: FC<InsightsComponentProps> = ({ shop }) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TTimePeriods>('30_days');

  const { data } = useGetInsights({
    shop,
    time_period: selectedTimePeriod
  });

  const getIconConfig = (metric: string) => {
    const iconConfigs: Record<string, any> = {
      'Revenue': {
        iconSource: MoneyIcon,
        iconColor: '#5C59E8',
        backgroundColor: '#DEDEFA',
      },
      'Conversion Rate': {
        iconSource: CartFilledIcon,
        iconColor: '#21C281',
        backgroundColor: '#CEFFEB',
      },
      'Retention Rate': {
        iconSource: RefreshIcon,
        iconColor: '#E46A11',
        backgroundColor: '#FAE1CF',
      },
      'AOV': {
        iconSource: ChannelsIcon,
        iconColor: '#07A1D0',
        backgroundColor: '#CFECFA',
      },
    };

    return iconConfigs[metric] || {
      iconSource: MoneyIcon,
      iconColor: '#5C59E8',
      backgroundColor: '#DEDEFA',
    };
  };

  const handleFilterChange = (selected: string) => {
    setSelectedTimePeriod(selected as TTimePeriods);
  };

  const insights = data?.data?.insights || [];

  return (
      <Card padding="400">
        <InlineStack gap="400" align="space-between" blockAlign="center">
          <Text as="h2" variant="headingLg">
            Insights
          </Text>
          <InsightsFilter onChange={handleFilterChange} />
        </InlineStack>

        {insights.length === 0 ? (
            <div style={{ paddingBlock: '24px' }}>
              <Text as="p" tone="subdued">No data available.</Text>
            </div>
        ) : (
            <InlineStack gap="400" align="start" blockAlign="start">
              {insights.map((insight, index) => {
                const iconConfig = getIconConfig(insight.metric);

                return (
                    <div key={index} style={{ flex: '1', paddingBlock: '24px' }}>
                      <InsightCard
                          title={insight.metric}
                          primaryValue={insight.with_iwand}
                          secondaryValue={insight.original}
                          iconSource={iconConfig.iconSource}
                          tooltipContent={`${insight.metric}`}
                          iconColor={iconConfig.iconColor}
                          backgroundColor={iconConfig.backgroundColor}
                      />
                    </div>
                );
              })}
            </InlineStack>
        )}
      </Card>
  );
};

export default InsightsComponent;