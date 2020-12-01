import React, { useState } from 'react';
import { Box, Avatar, ClickAwayListener } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import HighlightIcon from '@material-ui/icons/Highlight';
import useStyle from './styles';

const Tab = styled(NavLink)({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  color: 'white',
  width: '100%',
  height: '48px',
  textDecoration: 'none',
  fontWeight: 700,
  opacity: 0.5,
  '&:hover': {
    opacity: 1,
    transition: 'opacity 0.15s linear 0s',
  },
});

function Sidebar(): React.ReactElement {
  const [dropMenu, setDropMenu] = useState(false);

  const handleClick = (): void => {
    setDropMenu(!dropMenu);
  };

  const style = useStyle();
  return (
    <Box
      position="fixed"
      display="flex"
      flexDirection="column"
      className={style.container}
      width={220}
      pt={2}
      left={0}
    >
      <Box
        display="flex"
        flexDirection="row"
        component="div"
        className={style.profile}
        maxWidth={1}
        px={2}
      >
        <Box>
          <Avatar />
        </Box>
        <Box
          component="div"
          width="auto"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          onClick={handleClick}
          ml={1}
        >
          <Box className={style.profileMenu}>
            <Box
              display="flex"
              justifyContent="center"
              fontSize={16}
              fontWeight={700}
              className={style.profileMenuBtn}
              color="white"
              onClick={handleClick}
            >
              JuyoungPark
              <KeyboardArrowDownIcon />
            </Box>
          </Box>
          <Box component="div" color="white" textOverflow="ellipsis" overflow="hidden">
            juyoung7018.park@gmail.com
          </Box>
          {dropMenu ? (
            <ClickAwayListener onClickAway={handleClick}>
              <Box color="white">
                <Tab to="/project">Projects</Tab>
                <Tab to="/issue">Issues</Tab>
                <Tab to="/issue">Discover</Tab>
                <Tab to="/issue">Alerts</Tab>
              </Box>
            </ClickAwayListener>
          ) : null}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" pt={2}>
        <Tab to="/projects" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <ArchiveRoundedIcon />
            <Box px={2}>Projects</Box>
          </Box>
        </Tab>
        <Tab to="/issue" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <AssignmentIcon />
            <Box px={2}>Issues</Box>
          </Box>
        </Tab>
        <Tab to="/discover" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <HighlightIcon />
            <Box px={2}>Discover</Box>
          </Box>
        </Tab>
        <Tab to="/alerts" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <ReportProblemIcon />
            <Box px={2}>Alerts</Box>
          </Box>
        </Tab>
      </Box>
    </Box>
  );
}

export default Sidebar;
