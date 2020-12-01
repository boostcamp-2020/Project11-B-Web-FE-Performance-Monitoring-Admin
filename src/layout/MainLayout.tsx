import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { PrivateRouter } from '../Router';

const useStyle = makeStyles({
  root: {
    display: 'flex',
  },
  w100: {
    width: '100%',
  },
});
function MainLayout(): React.ReactElement {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Sidebar />
      <Box className={classes.w100}>
        <PrivateRouter />
      </Box>
    </div>
  );
}

export default MainLayout;
