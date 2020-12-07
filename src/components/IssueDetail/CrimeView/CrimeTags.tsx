import React from 'react';
import { Box, Typography } from '@material-ui/core';

import Tag from '../../Tag';

interface ITagContent {
  name: string;
  content: string;
}
interface IProps {
  className: string;
  tags: ITagContent[];
}

function CrimeTags(props: IProps): React.ReactElement {
  const { className, tags } = props;
  const title = 'TAGS';

  return (
    <Box className={className}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h4" color="primary">
          {title}
        </Typography>
        <Box pt={2} display="flex" flexWrap="wrap" gridGap={10}>
          {tags.map((tag: ITagContent) => (
            <Tag key={tag.name} name={tag.name} content={tag.content} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CrimeTags;
