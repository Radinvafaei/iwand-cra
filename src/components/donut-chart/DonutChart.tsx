'use client';
import { Card, Button, Text, BlockStack, InlineStack } from '@shopify/polaris';
import { MagicIcon } from '@shopify/polaris-icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import type {FC} from "react";
import {IGetConversationUsageResponse} from "src/service/interface";

const COLORS = ['#5C59E8', '#0000000F'];

const DonutChart: FC<IGetConversationUsageResponse> = ({ shop, usage }) => {
    const limit = Math.max(0, usage.limit || 0);
    const used = Math.min(usage.current || 0, limit);
    const remaining = Math.max(0, limit - used);
    const chartData = [
        { name: 'Used', value: used },
        { name: 'Remaining', value: remaining },
    ];
  return (
    <Card roundedAbove="sm">
      <BlockStack>
        <InlineStack align="space-between" blockAlign="center">
          <Text variant="headingMd" as="h3">
            Conversation Usage
          </Text>
          <Button disabled icon={MagicIcon} variant="primary" size="large">
            Upgrade
          </Button>
        </InlineStack>
        <div
          style={{
            height: '400px',
            width: '100%',
            display: 'flex',
            position: 'relative',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={usage.current === usage.limit ? 0 : 1}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label
                  value={`${usage.percentage}%`}
                  position="center"
                  dy={-10}
                  fill="#495057"
                  fontSize={16}
                  fontWeight="semibold"
                />
                <Label
                  value={`${usage.current} of ${usage.limit}`}
                  position="center"
                  dy={15}
                  fill="#666"
                  fontSize={14}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </BlockStack>
    </Card>
  );
};

export default DonutChart;
