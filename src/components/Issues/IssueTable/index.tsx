import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Box, FormControl, InputLabel, Select, Input, Chip, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import qs from 'querystring';
import IssueToolbar from './IssueToolbar';
import IssueListItem from './IssueListItem';
import service from '../../../service';
import { IssueType, IProjectCardProps } from '../../../types';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  }),
);
interface ITableProps {
  selectedProject: IProjectCardProps[];
}
function IssueTable(props: ITableProps): React.ReactElement {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const { selectedProject } = props;
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    // if (!selectedProject) return;
    (async () => {
      const query = `?${qs.stringify({
        page,
        projectId: selectedProject.map((pj) => {
          return pj._id;
        }),
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
  }, [page, selectedProject]);
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
