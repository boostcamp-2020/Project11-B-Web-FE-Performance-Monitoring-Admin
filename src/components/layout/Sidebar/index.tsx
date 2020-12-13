import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { Box, Avatar } from '@material-ui/core';
import { makeStyles, useTheme, Theme, createStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import HighlightIcon from '@material-ui/icons/Highlight';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import NotesIcon from '@material-ui/icons/Notes';
import { RootState } from '../../../modules';
import useStyle from './styles';
import { logoutUser } from '../../../modules/user';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      position: 'relative',
    },
    drawer: {
      minHeight: '100vh',
      backgroundColor: '#311b92',
    },
    drawerOpen: {
      position: 'relative',
      backgroundColor: '#311b92',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      position: 'relative',
      backgroundColor: '#311b92',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
    },
    toolbarBtn: { color: 'white' },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

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
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSingOut = () => {
    localStorage.removeItem('nickname');
    localStorage.removeItem('token');
    if (logoutUser) {
      dispatch(logoutUser());
      history.push('/');
    }
  };

  const style = useStyle();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        {!open ? (
          <div>
            <IconButton className={classes.toolbarBtn} onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        ) : (
          <div>
            <IconButton className={classes.toolbarBtn} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
        )}
      </div>
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
            >
              {user.nickname}
              <Box onClick={handleSingOut} pl={1}>
                <ExitToAppIcon />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" pt={2}>
        <Tab to="/projects" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <ArchiveRoundedIcon />
            <Box px={3}>Projects</Box>
          </Box>
        </Tab>
        <Tab to="/issue" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <AssignmentIcon />
            <Box px={3}>Issues</Box>
          </Box>
        </Tab>
        <Tab to="/discover" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <HighlightIcon />
            <Box px={3}>Discover</Box>
          </Box>
        </Tab>
        <Tab to="/analysis" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <NotesIcon />
            <Box px={3}>Analysis</Box>
          </Box>
        </Tab>
        <Tab to="/alerts" activeClassName={style.activeStyle}>
          <Box display="flex" alignItems="center" px={3}>
            <ReportProblemIcon />
            <Box px={3}>Alerts</Box>
          </Box>
        </Tab>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
