import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { PrivateRouter } from '../Router';
import getCookieByKey from '../utils/getCookie';
import Login from '../pages/Login';

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
  const cookieExists = getCookieByKey('token');
  return cookieExists ? (
    <div>
      <Sidebar />
      <Box className={classes.w100}>
        <PrivateRouter />
      </Box>
    </div>
  ) : (
    <div>
      <Login />
    </div>
  );
}

export default MainLayout;
