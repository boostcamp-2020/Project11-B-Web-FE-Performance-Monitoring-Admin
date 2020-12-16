import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PanopticonLogo from '../image/panopticon_2.png';

const useStyle = makeStyles({
  footerBox: {
    borderTop: '1px solid lightgray',
    padding: '30px 40px',
    display: 'flex',
    alignItems: 'center',
    color: 'gray',
  },
  footerContent: {
    paddingLeft: '15px',
  },
  footerTitle: {
    fontSize: '18px',
    paddingBottom: '4px',
  },
  link: {
    '&:visited': {},
    '&:hover': {
      color: 'blue',
    },
  },
  list: {
    padding: '0',
    margin: '0',
    listStyle: 'none',
    display: 'flex',
  },
  listItem: {
    paddingRight: '15px',
  },
});

function Footer(): React.ReactElement {
  const classes = useStyle();
  return (
    <Box className={classes.footerBox}>
      <img src={PanopticonLogo} alt="Panopticon" width="45" height="45" />
      <Box className={classes.footerContent}>
        <Box className={classes.footerTitle}>&copy;2020 BoostCamp, Team Panopticon</Box>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <a href="https://github.com/juyoungpark718">@juyoungpark718</a>
          </li>
          <li className={classes.listItem}>
            <a href="https://github.com/junsushin-dev">@junsushin-dev</a>
          </li>
          <li className={classes.listItem}>
            <a href="https://github.com/EarlyHail">@EarlyHail</a>
          </li>
          <li className={classes.listItem}>
            <a href="https://github.com/saeeng">@saeeng</a>
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default Footer;
