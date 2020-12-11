import React, { useState, useEffect } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { Box } from '@material-ui/core';
import qs from 'querystring';
import { useSelector } from 'react-redux';
import IssueToolbar from './IssueToolbar';
import IssueListItem from './IssueListItem';
import service from '../../../service';
import { IIssue } from '../../../types';
import { RootState } from '../../../modules';

function IssueTable(): React.ReactElement {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    (async () => {
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
    })();
  }, [page, selectedProjectsIds]);
  return (
    <Box my={1} display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #cfcfcf"
            borderRadius=".2rem"
          >
            <IssueToolbar />
            {issues.map((issue) => (
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

export default IssueTable;
