import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MainIntroduce from '../components/Main/MainIntroduce';
import PanLogo from '../image/pan-logo-black.png';
import collect from '../image/collect.gif';
import share from '../image/share.gif';
import discover from '../image/discover.gif';
import see from '../image/see.png';
import Login from '../components/Main/Login';
import MainBgImg from '../image/main-img.jpg';

const useStyles = makeStyles({
  mainDescription: {
    backgroundImage: `url(${MainBgImg})`,
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
  },
  coverBox: {
    width: '100%',
    height: '100%',
    'z-index': '-998',
    background: 'rgba(0,0,0,0.6)',
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
      img: collect,
    },
    {
      title: 'Share Your Project with Team Members',
      list: [
        '팀원을 초대해서 프로젝트를 공유해보세요.',
        '여러 프로젝트에 관련된 통합적 모니터링 기능을 통하여 보다 다양한 인사이트를 얻을 수 있습니다.',
      ],
      img: share,
    },
    {
      title: 'Discover Error Trends',
      list: [
        '어떤 브라우저, OS, URL에서 에러가 주로 발생하는지 파악해보세요. ',
        '프로젝트의 에러가 늘어나는지, 줄어드는지 트렌드를 모니터링 할 수 있습니다. ',
      ],
      img: discover,
    },
    {
      title: 'See How Your Clients Behave',
      list: [
        'MAU, DAU를 시각화합니다.',
        '페이지 간 이동 및 체류 시간에 관련된 데이터 패턴에 대한 모니터링 기능을 제공합니다.',
      ],
      img: see,
    },
  ];
  return (
    <Box>
      <Box
        display="flex"
        px={20}
        justifyContent="space-between"
        style={{
          height: '8vh',
          boxShadow: '0 1px 3px 0 #cfcfcf',
        }}
      >
        <Box display="flex" alignItems="center">
          <img height="50px" src={PanLogo} alt="panopticon-logo" />
        </Box>
        <Box display="flex" alignItems="center">
          <Login />
        </Box>
      </Box>
      <Box
        position="absolute"
        height="92vh"
        width="100%"
        className={classes.mainDescription}
        zIndex="-999"
      >
        <Box className={classes.coverBox} />
      </Box>

      <Container style={{ height: '92vh' }}>
        <Box
          display="flex"
          alignItems="center"
          fontSize="1.5rem"
          height="92vh"
          color="white"
          py={20}
          fontWeight="500"
        >
          Panopticon은 웹 App 개발 및 관리 프로세스에서 발생하는 에러 및 로그 모니터링 및 분석을
          도와주는 통합 플랫폼입니다.
        </Box>
        <Box>
          {introduces.map(({ title, list, img }) => (
            <MainIntroduce key={title} title={title} list={list} img={img} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Main;
