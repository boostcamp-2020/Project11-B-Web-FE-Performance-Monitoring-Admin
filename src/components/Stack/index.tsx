import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  stack: {
    borderBottom: '1px solid #867E8E',
    '&:last-child': {
      border: 'none',
    },
  },
  words: {
    wordBreak: 'break-word',
  },
});

function Stack(): React.ReactElement {
  const styles = useStyle();
  return (
    <Box px={2} py={1} className={styles.stack}>
      <Box display="flex" gridGap={5} className={styles.words}>
        <Box component="span">
          <Box component="span" color="#2B1D38">
            webpack://client/./src/pages/MainPage.js?
          </Box>
          <Box component="span" mx={0.6} color="#867E8E">
            in
          </Box>
          <Box component="span" color="#2B1D38">
            MainPage
          </Box>
          <Box component="span" mx={0.6} color="#867E8E">
            at line
          </Box>
          <Box component="span" color="#2B1D38">
            10:14
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Stack;
