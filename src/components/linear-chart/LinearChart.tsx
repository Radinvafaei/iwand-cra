'use client';
import {type FC } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type {LineChartProps} from './interface';

const LineChart: FC<LineChartProps> = ({
  data,
  lines,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  xAxisKey = 'name',
  yAxisDomain,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="1 3" stroke="#E1E3E5" />}
        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 12, fill: '#637381' }}
          axisLine={{ stroke: '#E1E3E5' }}
        />
        <YAxis
          domain={yAxisDomain}
          tick={{ fontSize: 12, fill: '#637381' }}
          axisLine={{ stroke: '#E1E3E5' }}
        />
        {showTooltip && (
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E1E3E5',
              borderRadius: '8px',
              padding: '8px',
            }}
          />
        )}
        {showLegend && <Legend />}
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={line.strokeWidth || 2}
            name={line.name}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
