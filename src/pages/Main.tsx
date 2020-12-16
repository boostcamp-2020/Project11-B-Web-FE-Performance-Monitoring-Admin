import React, { Suspense } from 'react';
import { Box, AppBar, Toolbar, useScrollTrigger, Typography } from '@material-ui/core';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MainIntroduce from '../components/Main/MainIntroduce';
import PanLogo from '../image/pan-logo-black.png';
import PanLogoWhite from '../image/pan-logo-white.png';
import Login from '../components/Main/Login';

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
    color: trigger ? 'white' : 'transparent',
    src: trigger ? PanLogo : PanLogoWhite,
  });
}

const useStyles = makeStyles({
  mainDescription: {
    // backgroundImage: `url(https://pixabay.com/get/57e8d4444352ac14f6d1867dda3536781537dee75253724b_1920.jpg)`,
    backgroundImage: `url(https://pixabay.com/get/54e8d64b4350ad14ead98d78c42f3e791222dfe35359714d7c2b7dd2.jpg)`,
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

function Main(): React.ReactElement {
  const classes = useStyles();
  const introduces = [
    {
      title: 'Collect Errors & Logs from Users',
      list: [
        '배포된 웹 App의 사용자들로부터 에러와 접속자, 접속 시간 로그를 실시간으로 수집하세요.',
      ],
      img:
        // 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c12fefd8-0f80-4d35-a6a4-4aeb13625e95/bU7LFpvQVj.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201215T082142Z&X-Amz-Expires=86400&X-Amz-Signature=ab6d0794975c1403087c969a47b7f81ad6539e5a38892888d4c318d1ce84933a&X-Amz-SignedHeaders=host',
        'https://i.imgur.com/qAVbuIG.gif',
    },
    {
      title: 'Share Your Project with Team Members',
      list: [
        '팀원을 초대해서 프로젝트를 공유해보세요.',
        '여러 프로젝트에 관련된 통합적 모니터링 기능을 통하여 보다 다양한 인사이트를 얻을 수 있습니다.',
      ],
      img:
        'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/16b4e3ea-2979-4148-831d-b389169f01eb/0LrkhL0djo.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201215T082142Z&X-Amz-Expires=86400&X-Amz-Signature=2b021d5fa2b7a44a6957c105d0c8130b088cb6f6d04b8fa5b53562d9c00e3fd1&X-Amz-SignedHeaders=host',
    },
    {
      title: 'Discover Error Trends',
      list: [
        '어떤 브라우저, OS, URL에서 에러가 주로 발생하는지 파악해보세요. ',
        '프로젝트의 에러가 늘어나는지, 줄어드는지 트렌드를 모니터링 할 수 있습니다. ',
      ],
      img:
        'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/be7e4f1b-9078-4bfa-82aa-be905403717b/BKcmuN2U49.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201215T082142Z&X-Amz-Expires=86400&X-Amz-Signature=90c522c7c5feb7801f14e7ac91496e65f5be0b2f2c7a7a51bea717b1e3b6fef8&X-Amz-SignedHeaders=host',
    },
    {
      title: 'See How Your Clients Behave',
      list: [
        'MAU, DAU를 시각화합니다.',
        '페이지 간 이동 및 체류 시간에 관련된 데이터 패턴에 대한 모니터링 기능을 제공합니다.',
      ],
      img:
        'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/464de679-14cb-4e45-814f-40e69b172681/MiBZlmAxvs.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201215T082142Z&X-Amz-Expires=86400&X-Amz-Signature=f903f068fcdb5662d884c1743e78af420e805a7d491bba09e1d7a9b1b351e933&X-Amz-SignedHeaders=host',
    },
  ];
  return (
    <Box>
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
        position="absolute"
        zIndex="-999"
        height="85vh"
        width="100%"
        className={classes.mainDescription}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="1.5rem"
        height="85vh"
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
          <Typography color="primary" variant="h2">
            - 웹 APP 개발 에러 및 로그 모니터링 및 분석 플랫폼 -
          </Typography>
          <Box minWidth="50%">
            <Login color="black" large />
          </Box>
        </Box>
      </Box>

      <Container style={{ height: '90vh' }}>
        <Box>
          <Box textAlign="center" width="100%">
            <h1>Feature</h1>
          </Box>
          {introduces.map(({ title, list, img }) => (
            <Suspense fallback="loading">
              <MainIntroduce key={title} title={title} list={list} img={img} />
            </Suspense>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Main;
