import React from 'react';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PanopticonLogo from '../image/panopticon.png';

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

const isDev: boolean = process.env.NODE_ENV === 'development';
const oauthURL: string = isDev ? 'http://panopticon-dev.gq/api/auth/github' : '/api/auth/github';
// const oauthURL: string = isDev ? 'http://localhost:3000/api/auth/github' : '/api/auth/github';

const Login = (): React.ReactElement => {
  window.history.replaceState(null, '', '/login');

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
      <Button variant="contained" color="default" className={classes.button}>
        <GitHubIcon fontSize="inherit" className={classes.icon} />
        <a href={oauthURL}>Login With Github</a>
      </Button>
    </Grid>
  );
};
export default Login;
