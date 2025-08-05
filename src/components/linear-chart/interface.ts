export interface DataPoint {
  name: string;
  [key: string]: string | number;
}

export interface LineConfig {
  dataKey: string;
  name: string;
  color: string;
  strokeWidth?: number;
}

export interface LineChartProps {
  data: DataPoint[];
  lines: LineConfig[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisKey?: string;
  yAxisDomain?: [number, number];
}

export interface Agent {
  id: string;
  name: string;
  color: string;
}

export interface AgentUsageData {
  date: string;
  total: number;
  [agentId: string]: string | number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface IUsage {
  date: string;
  count: number;
}

export interface IAgentUsage {
  name: string;
  usage: IUsage[];
}

export interface IAgentsUsageResponse {
  shop: string;
  agents: IAgentUsage[];
}

export interface AgentsUsageChartProps {
  data?: AgentUsageData[];
  agents?: Agent[];
  onDateRangeChange?: (range: DateRange) => void;
  onAgentFilterChange?: (selectedAgentIds: string[]) => void;
}