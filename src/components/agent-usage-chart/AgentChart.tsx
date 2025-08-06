'use client';

import { useState, useCallback, useMemo, type FC } from 'react';
import {
  type AgentsUsageChartProps,
  type LineConfig,
} from 'src/components/linear-chart/interface';
import {
  Card,
  Button,
  Popover,
  DatePicker,
  ChoiceList,
  Box,
  InlineStack,
  Text,
  BlockStack,
} from '@shopify/polaris';
import { AdjustIcon, CalendarIcon, XIcon } from '@shopify/polaris-icons';
import { LineChart } from 'src/components/linear-chart';

const AgentsUsageChart: FC<AgentsUsageChartProps> = ({data = [], agents = [], onDateRangeChange, onAgentFilterChange,}) => {
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>(['total']);
  const [datePickerActive, setDatePickerActive] = useState(false);
  const [filterPopoverActive, setFilterPopoverActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  useState(() => {
    if (agents.length > 0 && selectedAgentIds.length === 0) {
      setSelectedAgentIds(agents.slice(0, 2).map(agent => agent.id));
    }
  });

  const toggleDatePicker = useCallback(() => {
    setDatePickerActive((active) => !active);
  }, []);

  const toggleFilterPopover = useCallback(() => {
    setFilterPopoverActive((active) => !active);
  }, []);

  const handleMonthChange = useCallback((month: number, year: number) => {
    setDate({ month, year });
  }, []);

  const handleDateSelection = useCallback(
      ({ start }: { start: Date; end: Date }) => {
        setSelectedDate(start);
        setDatePickerActive(false);
        if (onDateRangeChange) {
          onDateRangeChange({ start, end: start });
        }
      },
      [onDateRangeChange],
  );

  const handleAgentSelection = useCallback(
      (selected: string[]) => {
        setSelectedAgentIds(selected);
        if (onAgentFilterChange) {
          onAgentFilterChange(selected);
        }
      },
      [onAgentFilterChange],
  );

  const handleApplyFilter = useCallback(() => {
    setFilterPopoverActive(false);
  }, []);

  const handleResetFilter = useCallback(() => {
    setSelectedAgentIds([]);
  }, []);

  const selectedAgentsCount = selectedAgentIds.length;

  const lineConfigs: LineConfig[] = useMemo(() => {
    const configs: LineConfig[] = [];

    if (selectedAgentIds.includes('total')) {
      configs.push({
        dataKey: 'total',
        name: 'Total',
        color: '#8B5CF6',
        strokeWidth: 3,
      });
    }

    agents.forEach((agent) => {
      if (selectedAgentIds.includes(agent.id)) {
        configs.push({
          dataKey: agent.id,
          name: agent.name,
          color: agent.color,
          strokeWidth: 2,
        });
      }
    });

    return configs;
  }, [selectedAgentIds, agents]);

  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: item.date,
      ...item,
    }));
  }, [data]);

  const datePickerActivator = (
      <Button size="large" onClick={toggleDatePicker} icon={CalendarIcon}>
        Select Date
      </Button>
  );

  const filterActivator = (
      <Button
          size="large"
          onClick={toggleFilterPopover}
          icon={selectedAgentsCount > 0 ? XIcon : AdjustIcon}
      >
        {selectedAgentsCount > 0 ? `${selectedAgentsCount} Agents` : 'Filter'}
      </Button>
  );

  const agentChoices = [
    { label: 'Total', value: 'total' },
    ...agents.map((agent) => ({
      label: agent.name,
      value: agent.id,
    })),
  ];

  return (
      <Card>
        <Box paddingInline="400">
          <BlockStack>
            <InlineStack align="space-between">
              <Text as="h2" variant="headingLg">
                Agents Usage
              </Text>
              <InlineStack gap="200">
                <Popover
                    active={datePickerActive}
                    activator={datePickerActivator}
                    onClose={toggleDatePicker}
                    preferredAlignment="right"
                >
                  <Box padding="200">
                    <DatePicker
                        month={month}
                        year={year}
                        onChange={handleDateSelection}
                        onMonthChange={handleMonthChange}
                    />
                  </Box>
                </Popover>
                <Popover
                    active={filterPopoverActive}
                    activator={filterActivator}
                    onClose={toggleFilterPopover}
                    preferredAlignment="right"
                >
                  <Box paddingInline="400" minWidth="300px">
                    <BlockStack>
                      <InlineStack align="space-between">
                        <Text as="h3" variant="headingMd">
                          Agents
                        </Text>
                        <Button
                            size="large"
                            variant="monochromePlain"
                            tone="critical"
                            onClick={handleResetFilter}
                            icon={XIcon}
                        >
                          Reset
                        </Button>
                      </InlineStack>
                      <ChoiceList
                          title="agent usage"
                          titleHidden
                          allowMultiple
                          choices={agentChoices}
                          selected={selectedAgentIds}
                          onChange={handleAgentSelection}
                      />
                      <InlineStack gap="200" align="end">
                        <Button onClick={toggleFilterPopover}>Cancel</Button>
                        <Button
                            size="large"
                            variant="primary"
                            onClick={handleApplyFilter}
                        >
                          Apply Filter
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                </Popover>
              </InlineStack>
            </InlineStack>
            <Box>
              <LineChart
                  data={chartData}
                  lines={lineConfigs}
                  height={400}
                  xAxisKey="name"
                  yAxisDomain={[0, 1400]}
              />
            </Box>
          </BlockStack>
        </Box>
      </Card>
  );
};
export default AgentsUsageChart;
