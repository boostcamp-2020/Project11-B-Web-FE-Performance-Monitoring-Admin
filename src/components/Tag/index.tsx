import React from 'react';
import { Box } from '@material-ui/core';

interface IProps {
  name: string;
  content: string;
}

function Tag(props: IProps): React.ReactElement {
  const { name, content } = props;
  return (
    <Box display="flex" px={1} border="1px solid #BCB5C4" borderRadius="3px" maxWidth="100%">
      <Box p={0.1} mr={1}>
        {name}
      </Box>
      <Box py={0.1} pl={1} pr={0.1} borderLeft="1px solid #BCB5C4" color="#4C7AD0">
        {content}
      </Box>
    </Box>
  );
}

export default Tag;
