import React from 'react';
import { Box, Typography } from '@material-ui/core';

import Stack from '../../Stack';

interface IStack {
  _id: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}
interface IProps {
  type: string;
  message: string;
  className: string;
  stack: IStack[];
}

function CrimeStack(props: IProps): React.ReactElement {
  const { className, type, message, stack } = props;
  const title = 'STACK';

  return (
    <Box className={className}>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Box mt={2}>
        <Box fontSize="20px" fontWeight={500}>
          {type}
        </Box>
        <Box>{message}</Box>
      </Box>
      <Box
        mt={2}
        width="100%"
        display="flex"
        flexDirection="column"
        border="1px solid #9386A0"
        borderRadius="3px"
      >
        {stack.map((line) => (
          <Stack key={line._id} stack={line} />
        ))}
      </Box>
    </Box>
  );
}

export default CrimeStack;
