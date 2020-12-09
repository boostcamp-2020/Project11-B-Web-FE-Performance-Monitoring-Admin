import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../components/layout/Sidebar';
import { PrivateRouter, PublicRouter } from '../Router';
import { RootState } from '../modules';

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
  const user = useSelector((state: RootState) => state.user);
  return user.token ? (
    <div className={classes.root}>
      <Sidebar />
      <Box className={classes.w100}>
        <PrivateRouter />
      </Box>
    </div>
  ) : (
    <div>
      <PublicRouter />
    </div>
  );
}

export default MainLayout;
