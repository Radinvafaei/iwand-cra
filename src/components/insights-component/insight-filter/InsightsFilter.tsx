'use client';
import {type FC, useState } from 'react';
import { Button, ButtonGroup } from '@shopify/polaris';
import type {InsightFilterProps} from './interface';

const InsightsFilter: FC<InsightFilterProps> = ({
  initialSelected = 'All Time',
  onChange,
}) => {
  const filters = ['All Time', '12 Months', '30 Days', '7 Days', '24 Hours'];
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <ButtonGroup variant="segmented">
      {filters.map((filter) => (
        <Button
          key={filter}
          pressed={selected === filter}
          onClick={() => handleSelect(filter)}
          variant="secondary"
        >
          {filter}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default InsightsFilter;
