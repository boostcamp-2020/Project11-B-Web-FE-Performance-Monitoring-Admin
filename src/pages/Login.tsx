import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs';
import PanopticonLogo from '../image/panopticon.png';
import service from '../service';
import UserContext from '../context';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: '20px',
  },
  button: {
    backgroundColor: 'black',
    margin: theme.spacing(4),
    textTransform: 'none',
    fontSize: '20px',
    color: 'white',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
  icon: {
    marginRight: '10px',
  },
  img: {
    width: '240px',
    height: 'auto',
    margin: '0 auto',
  },
}));

type IWindowProps = {
  url: string;
  title: string;
  width: number;
  height: number;
};

const Login = (): React.ReactElement => {
  const { setUser } = useContext(UserContext);
  const OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_ID
      : process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID
  }&scope=user:email`;

  const [externalWindow, setExternalWindow] = useState<Window | null>();
  const intervalRef = useRef<number>();
  const history = useHistory();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const createPopup = ({ url, title, height, width }: IWindowProps) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const externalPopup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`,
    );
    return externalPopup;
  };

  const handleClick = () => {
    setExternalWindow(
      createPopup({
        url: OAUTH_URL,
        title: '',
        width: 500,
        height: 600,
      }),
    );
  };

  useEffect(() => {
    if (externalWindow) {
      intervalRef.current = window.setInterval(async () => {
        try {
          const currentUrl = externalWindow.location.search;
          const { code } = qs.parse(currentUrl, { ignoreQueryPrefix: true });
          if (!code) return;
          clearTimer();
          const { data } = await service.login(code as string);
          if (!data.token || !data.nickname) {
            history.replace('/');
          } else {
            const { nickname, token } = data;
            localStorage.setItem('token', token);
            localStorage.setItem('nickname', nickname);
            if (setUser) {
              setUser({ nickname, token });
            }
            history.replace('/projects');
            externalWindow.close();
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        } finally {
          if (!externalWindow || externalWindow.closed) {
            externalWindow.close();
            clearTimer();
          }
        }
      }, 1000);
    }
  });

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.grid}
    >
      <Box height="100vh" pt={20}>
        <Paper elevation={3}>
          <Box display="flex" flexDirection="column" p={10}>
            <img className={classes.img} src={PanopticonLogo} alt="logo" />
            <Button onClick={handleClick} variant="contained" className={classes.button}>
              <GitHubIcon fontSize="inherit" className={classes.icon} />
              Sign in With GitHub
            </Button>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};
export default Login;
