import React from 'react';
import { Box } from '@material-ui/core';
import Sidebar from '../components/layout/Sidebar';
import { PrivateRouter } from '../Router';

function MainLayout(): React.ReactElement {
  return (
    <div>
      <Sidebar />
      <Box pl="220px">
        <PrivateRouter />
      </Box>
    </div>
  );
}

export default MainLayout;
