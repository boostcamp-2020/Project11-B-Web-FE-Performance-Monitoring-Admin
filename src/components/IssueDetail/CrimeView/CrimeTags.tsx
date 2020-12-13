import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { ICrime } from '../../../types';
import Tag from '../../Tag';
import { convertIP } from '../../../utils/convertIP';

interface ITagContent {
  name: string;
  content: string;
}
interface IProps {
  className: string;
  crime: ICrime;
}

function CrimeTags(props: IProps): React.ReactElement {
  const { className, crime } = props;
  const title = 'TAGS';

  const getTags = (curr: ICrime) => {
    const { browser, os, url, ip } = curr.meta;
    const customTags = Object.keys(curr.meta)
      .filter((key) => {
        if (key === 'browser' || key === 'os' || key === 'ip' || key === 'url') return false;
        return true;
      })
      .map((key) => {
        return { name: key, content: curr.meta[`${key}`] };
      });
    return [
      ...customTags,
      { name: 'browser.name', content: browser.name },
      { name: 'browser', content: `${browser.name} ${browser.version}` },
      { name: 'os.name', content: os.name },
      { name: 'os', content: `${os.name} ${os.version}` },
      { name: 'url', content: url },
      { name: 'ip', content: convertIP(ip) },
    ];
  };

  return (
    <Box className={className}>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Box pt={2} display="flex" flexWrap="wrap" gridGap={10}>
        {getTags(crime).map((tag: ITagContent) => (
          <Tag key={tag.name} name={tag.name} content={tag.content} />
        ))}
      </Box>
    </Box>
  );
}

export default CrimeTags;
