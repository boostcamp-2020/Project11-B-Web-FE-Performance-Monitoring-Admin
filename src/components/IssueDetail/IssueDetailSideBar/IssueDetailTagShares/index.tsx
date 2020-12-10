import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tag from './TagSharesBar';
import service from '../../../../service';

interface IProps {
  issueId: string;
}

interface IMetas {
  browser?: { name: string; count: number }[];
  os?: { name: string; count: number }[];
  url?: { name: string; count: number }[];
}

function IssueDetailTagShares(props: IProps): React.ReactElement {
  const { issueId } = props;
  const [metas, setMetas] = useState<IMetas>();
  useEffect(() => {
    (async () => {
      if (!issueId) return;
      const {
        data: { metas: responseMetas },
      } = await service.getSharesDataByIssue(issueId);
      setMetas(responseMetas);
    })();
  }, [issueId]);
  return (
    <Box>
      <Box display="flex" alignItems="center" my={3}>
        <Typography>Tags</Typography>
        <Box height="0" width="100%" border="1px solid #bababa" mx={1} />
      </Box>
      <Box display="flex" flexDirection="column" gridGap={10}>
        {metas &&
          (Object.keys(metas) as Array<keyof IMetas>).map((key) => {
            const meta: { name: string; count: number }[] | undefined = metas[key];
            const totalCount = meta ? meta.reduce((acc, el) => acc + el.count, 0) : 0;
            return (
              <Box>{meta && <Tag key={key} title={key} meta={meta} totalCount={totalCount} />}</Box>
            );
          })}
      </Box>
    </Box>
  );
}

export default IssueDetailTagShares;
