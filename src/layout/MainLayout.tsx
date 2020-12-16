import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Sidebar from '../components/layout/Sidebar';
import { PrivateRouter, PublicRouter } from '../Router';

const useStyle = makeStyles({
  root: {
    display: 'flex',
  },
  w100: {
    width: '100%',
  },
});
const title = 'PANOPTICON';
const favicon = '../public/favicon2.ico';
const description = 'Panopticon - 에러 로그 모니터링 분석 플랫폼';

function MainLayout(): React.ReactElement {
  const classes = useStyle();
  const token = localStorage.getItem('token');
  return token ? (
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
      </Box>
    </div>
  ) : (
    <div>
      <PublicRouter />
    </div>
  );
}

export default MainLayout;
