import { Agent, AgentUsageData } from 'src/components/linear-chart/interface';
import { ArrowUpIcon, CheckCircleIcon } from '@shopify/polaris-icons';

export const mockAgents: Agent[] = [
  {
    id: 'inspiration',
    name: 'Inspiration agent',
    color: '#5C6AC4',
  },
  {
    id: 'enhanced-search',
    name: 'Enhanced search agent',
    color: '#F49342',
  },
  {
    id: 'product-discovery',
    name: 'Product discovery agent',
    color: '#00A0AC',
  },
];

export const mockData: AgentUsageData[] = [
  {
    date: 'Jan',
    total: 900,
    inspiration: 850,
    'enhanced-search': 700,
    'product-discovery': 600,
  },
  {
    date: 'Feb',
    total: 850,
    inspiration: 700,
    'enhanced-search': 600,
    'product-discovery': 550,
  },
  {
    date: 'Mar',
    total: 1000,
    inspiration: 900,
    'enhanced-search': 800,
    'product-discovery': 700,
  },
  {
    date: 'Apr',
    total: 1100,
    inspiration: 950,
    'enhanced-search': 850,
    'product-discovery': 750,
  },
  {
    date: 'May',
    total: 950,
    inspiration: 900,
    'enhanced-search': 700,
    'product-discovery': 650,
  },
  {
    date: 'Jun',
    total: 1050,
    inspiration: 1000,
    'enhanced-search': 800,
    'product-discovery': 700,
  },
  {
    date: 'Jul',
    total: 1100,
    inspiration: 1050,
    'enhanced-search': 850,
    'product-discovery': 800,
  },
  {
    date: 'Aug',
    total: 1000,
    inspiration: 950,
    'enhanced-search': 750,
    'product-discovery': 700,
  },
  {
    date: 'Sep',
    total: 1300,
    inspiration: 1200,
    'enhanced-search': 900,
    'product-discovery': 850,
  },
  {
    date: 'Oct',
    total: 900,
    inspiration: 850,
    'enhanced-search': 700,
    'product-discovery': 650,
  },
  {
    date: 'Nov',
    total: 950,
    inspiration: 900,
    'enhanced-search': 800,
    'product-discovery': 750,
  },
  {
    date: 'Dec',
    total: 1000,
    inspiration: 950,
    'enhanced-search': 850,
    'product-discovery': 800,
  },
];
