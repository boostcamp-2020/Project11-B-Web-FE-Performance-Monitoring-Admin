import React from 'react';
import { Box } from '@material-ui/core';
import Tag from '../components/Tag';
import Stack from '../components/Stack';

function IssueDetail(): React.ReactElement {
  return (
    <Box>
      <Box borderBottom="1px solid #E2DEE6" px={4} py={2}>
        <Box display="flex" gridGap={10} alignItems="center">
          <Box fontSize="24px" fontWeight={700}>
            ReferencedError
          </Box>
          <Box fontSize="20px" color="#817091">
            MainPage(src/pages/MainPage)
          </Box>
        </Box>
        <Box fontSize="16px">undefiendMethod is not defined</Box>
      </Box>
      <Box borderBottom="1px solid #E2DEE6">
        <Box px={4} py={4}>
          <Box color="#9386A0" pb={2}>
            TAGS
          </Box>
          <Box display="flex" flexWrap="wrap" gridGap={10}>
            <Tag name="browser" content="Chrome 86.0.4240" />
            <Tag name="browser" content="Chrome 86.0.4240" />
            <Tag name="browser" content="Chrome 86.0.4240" />
            <Tag name="browser" content="Chrome 86.0.4240" />
            <Tag name="browser" content="Chrome 86.0.4240" />
            <Tag name="browser" content="Chrome 86.0.4240" />
            <Tag name="browser" content="Chrome 86.0.4240" />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box px={4} py={2}>
          <Box>
            <Box>
              <Box fontSize="20px" fontWeight={500}>
                ReferenceError
              </Box>
              <Box>undefiendMethod is not defined</Box>
            </Box>
          </Box>
          <Box mt={3} border="1px solid #9386A0" borderRadius="3px">
            <Stack />
            <Stack />
            <Stack />
            <Stack />
            <Stack />
            <Stack />
            <Stack />
            <Stack />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default IssueDetail;
