import React, { useState, useEffect, useCallback, useMemo } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { Box, Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import qs from 'querystring';
import { useSelector } from 'react-redux';
import TimerBtn from '../../common/TimerBtn';
import IssueToolbar from './IssueToolbar';
import IssueListItem from './IssueListItem';
import service from '../../../service';
import { IIssue } from '../../../types';
import { RootState } from '../../../modules';
import arrayToCSV from '../../../utils/arrayToCSV';

function IssueTable(): React.ReactElement {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>();
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDownload = (): void => {
    if (issues === undefined) {
      return;
    }

    const rows = [
      ['project Name', '_id', 'message', 'type', 'lastOccuredAt'],
      ...issues.map((row) => {
        return [
          row._id.project[0].name,
          row._id._id,
          row._id.message,
          row._id.type,
          new Date(row._id.lastCrime.occuredAt).toISOString(),
        ];
      }),
    ];
    arrayToCSV(rows);
  };

  const getData = useCallback(async () => {
    const query = `?${qs.stringify({
      page,
      projectId: selectedProjectsIds,
    })}`;
    const res = await service.getIssues(query);
    if (res.data.data === undefined) {
      setTotalPage(0);
      setIssues([]);
      return;
    }
    setTotalPage(res.data.metaData.totalPage);
    setIssues(res.data.data);
  }, [page, selectedProjectsIds]);
  const RenderIssue = useMemo(() => issues, [issues]);
  useEffect(() => {
    (async () => {
      getData();
    })();
  }, [page, selectedProjectsIds, getData]);
  return (
    <Box my={1} display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <Box my={1} display="flex" justifyContent="flex-end">
          <Box mr={1}>
            <Button variant="contained" onClick={handleDownload} color="primary" size="small">
              <CloudDownloadIcon />
            </Button>
          </Box>
          <Box>
            <TimerBtn action={getData} count={5} />
          </Box>
        </Box>
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #cfcfcf"
            borderRadius=".2rem"
          >
            <IssueToolbar />
            {RenderIssue.map((issue) => (
              <IssueListItem key={issue._id._id} issue={issue} />
            ))}
            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
              <Pagination count={totalPage} page={page} onChange={handlePageChange} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(IssueTable);
