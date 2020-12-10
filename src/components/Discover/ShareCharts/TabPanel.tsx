import React from 'react';

import { Box } from '@material-ui/core';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box width="100%">{children}</Box>}
    </div>
  );
}

export default TabPanel;
