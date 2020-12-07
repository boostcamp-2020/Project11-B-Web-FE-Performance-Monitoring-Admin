import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styled, makeStyles } from '@material-ui/core/styles';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IssueType } from '../../types';

const useStyle = makeStyles({
  root: {
    minHeight: '100%',
  },
});

function IssueDetailSideBar(): React.ReactElement {
  const styles = useStyle();
  return (
    <Box display="flex" fontSize="small" px={3} py={1} className={styles.root}>
      sideBar
    </Box>
  );
}

export default IssueDetailSideBar;
