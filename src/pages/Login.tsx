import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs';
import PanopticonLogo from '../image/panopticon.png';
import service from '../service';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: '20px',
  },
  button: {
    margin: theme.spacing(5),
    textTransform: 'none',
    fontSize: '30px',
    fontWeight: 600,
  },
  icon: {
    marginRight: '10px',
  },
}));

type IWindowProps = {
  url: string;
  title: string;
  width: number;
  height: number;
};

const Login = (): React.ReactElement => {
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
            history.replace('/login');
          } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('nickname', data.token);
            history.replace('/');
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
      <img src={PanopticonLogo} alt="logo" />
      <Button onClick={handleClick} variant="contained" color="default" className={classes.button}>
        <GitHubIcon fontSize="inherit" className={classes.icon} />
        Login With Github
      </Button>
    </Grid>
  );
};
export default Login;
