import React from 'react';
import { Box, AppBar, Toolbar, useScrollTrigger, Typography } from '@material-ui/core';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MainIntroduce from '../components/Main/MainIntroduce';
import PanLogo from '../image/pan-logo-black.png';
import PanLogoWhite from '../image/pan-logo-white.png';
import Login from '../components/Main/Login';
import useDelayedImg from '../hooks/DelayedImgHooks';

interface IProps {
  children: React.ReactElement;
}

function ElevationScroll(props: IProps) {
  const { children } = props;

  const trigger = useScrollTrigger({
    threshold: 0,
    target: window,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? 'inherit' : 'transparent',
    src: trigger ? PanLogo : PanLogoWhite,
  });
}

const useStyles = makeStyles({
  mainDescription: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  coverBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '45% 0',
    padding: '8%',
    background: 'rgba(0,0,0,0.85)',
  },
});
const introduces = [
  {
    title: 'Collect Errors & Logs from Users',
    list: ['배포된 웹 App의 사용자들로부터 에러와 접속자, 접속 시간 로그를 실시간으로 수집하세요.'],
    img: 'https://i.imgur.com/qAVbuIG.gif',
  },
  {
    title: 'Share Your Project with Team Members',
    list: [
      '팀원을 초대해서 프로젝트를 공유해보세요.',
      '여러 프로젝트에 관련된 통합적 모니터링 기능을 통하여 보다 다양한 인사이트를 얻을 수 있습니다.',
    ],
    img: 'https://i.imgur.com/qVVrBJJ.gif',
  },
  {
    title: 'Discover Error Trends',
    list: [
      '어떤 브라우저, OS, URL에서 에러가 주로 발생하는지 파악해보세요. ',
      '프로젝트의 에러가 늘어나는지, 줄어드는지 트렌드를 모니터링 할 수 있습니다. ',
    ],
    img: 'https://i.imgur.com/i9R1d7w.gif',
  },
  {
    title: 'See How Your Clients Behave',
    list: [
      'MAU, DAU를 시각화합니다.',
      '페이지 간 이동 및 체류 시간에 관련된 데이터 패턴에 대한 모니터링 기능을 제공합니다.',
    ],
    img: 'https://i.imgur.com/w1nhwCb.gif',
  },
];

function Main(): React.ReactElement {
  const classes = useStyles();
  const src =
    'https://firebasestorage.googleapis.com/v0/b/panopticon-7444c.appspot.com/o/laptop-2838918.jpg?alt=media&token=4a2b7c76-0110-4ff0-b54a-3a5c4ef80be8';

  const loadedSrc = useDelayedImg(src);

  return (
    <Box>
      <Box
        position="absolute"
        zIndex="-999"
        height="85vh"
        width="100%"
        minHeight="700px"
        className={classes.mainDescription}
        style={{
          backgroundImage: `url(${
            loadedSrc ||
            'https://firebasestorage.googleapis.com/v0/b/panopticon-7444c.appspot.com/o/laptop-2838918_640.jpg?alt=media&token=97ecb6c7-8a10-4ba4-8714-1f06b76033a9'
          })`,
        }}
      />
      <ElevationScroll>
        <AppBar color="transparent">
          <Toolbar
            style={{
              padding: '20px 5vw',
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            <ElevationScroll>
              <img width="200px" src={PanLogo} alt="panopticon-logo" />
            </ElevationScroll>
            <Box>
              <Login color="white" large={false} />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="1.5rem"
        height="85vh"
        minHeight="700px"
        py={20}
        fontWeight="500"
        zIndex="2"
      >
        <Box
          fontFamily="Segoe UI"
          className={classes.coverBox}
          style={{
            color: '#eee',
            fontWeight: 'bolder',
            fontSize: '65px',
            lineHeight: '85px',
            textAlign: 'center',
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <Box />
          <img width="450px" src={PanLogoWhite} alt="panopticon-logo" />

          <Typography variant="h2">- 웹 APP 개발 에러 및 로그 모니터링 및 분석 플랫폼 -</Typography>
          <Box minWidth="50%">
            <Login color="black" large />
          </Box>
        </Box>
      </Box>

      <Container style={{ height: '90vh' }}>
        <Box mt={15}>
          <Box textAlign="center" width="100%">
            <h1>Feature</h1>
          </Box>
          {introduces.map(({ title, list, img }) => (
            <MainIntroduce key={title} title={title} list={list} img={img} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Main;
