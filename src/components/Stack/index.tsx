import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IStack {
  _id: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}

interface IProps {
  stack: IStack;
}

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

function Stack(props: IProps): React.ReactElement {
  const { stack } = props;
  const styles = useStyle();
  return (
    <Box px={2} py={1} className={styles.stack}>
      <Box display="flex" gridGap={5} className={styles.words}>
        <Box component="span">
          <Box component="span" color="#2B1D38">
            {stack.function}
          </Box>
          <Box component="span" mx={0.6} color="#867E8E">
            in
          </Box>
          <Box component="span" color="#2B1D38">
            {stack.filename}
          </Box>
          <Box component="span" mx={0.6} color="#867E8E">
            at line
          </Box>
          <Box component="span" color="#2B1D38">
            {stack.lineNo}:{stack.columnNo}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Stack;
