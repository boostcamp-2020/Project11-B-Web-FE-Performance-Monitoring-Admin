import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Sidebar from '../components/layout/Sidebar';
import { PrivateRouter, PublicRouter } from '../Router';
import { RootState } from '../modules';
import Footer from '../components/layout/Footer';

const useStyle = makeStyles({
  root: {
    display: 'flex',
  },
  w100: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
const title = 'PANOPTICON';
const favicon = '../public/favicon2.ico';
const description = 'Panopticon - 에러 로그 모니터링 분석 플랫폼';

function MainLayout(): React.ReactElement {
  const classes = useStyle();
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem('token');
  return user.token || token ? (
    <div className={classes.root}>
      <Helmet
        meta={[
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:image', content: favicon },
        ]}
      />
      <Sidebar />
      <Box className={classes.w100}>
        <PrivateRouter />
        <Footer />
      </Box>
    </div>
  ) : (
    <div>
      <PublicRouter />
    </div>
  );
}

export default MainLayout;
