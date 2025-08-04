'use client';

import { type FC, useState } from 'react';
import { type SectionHeaderProps } from './interface';
import { Button, Popover, ActionList } from '@shopify/polaris';

const AgentSectionHeader: FC<SectionHeaderProps> = ({
  title,
  onDeactivateAll,
  onActivateAll,
  showDivider = true,
}) => {
  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopoverActive = () => setPopoverActive(!popoverActive);
  const handleDeactivateAllClick = () => {
    setPopoverActive(false);
    onDeactivateAll();
  };

  const handleActivateAllClick = () => {
    setPopoverActive(false);
    onActivateAll();
  };

  const activator = (
    <Button variant="monochromePlain" onClick={togglePopoverActive}>
      {title}
    </Button>
  );

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          ariaHaspopup={false}
          sectioned
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: `Deactivate All`,
                onAction: handleDeactivateAllClick,
                destructive: true,
              },
              {
                content: 'Activate All',
                onAction: handleActivateAllClick,
              },
            ]}
          />
        </Popover>
      </div>
      {showDivider && (
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#DEDEFA',
            marginBlock: 'auto',
            marginLeft: '5px',
          }}
        />
      )}
    </div>
  );
};

export default AgentSectionHeader;
