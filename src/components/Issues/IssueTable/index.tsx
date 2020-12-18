import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Pagination from '@material-ui/lab/Pagination';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useSelector } from 'react-redux';
import TimerBtn from '../../common/TimerBtn';
import IssueToolbar from './IssueToolbar';
import IssueListItem from './IssueListItem';
import service from '../../../service';
import { IIssue } from '../../../types';
import { RootState } from '../../../modules';
import arrayToCSV from '../../../utils/arrayToCSV';
import useInterval from '../../../hooks/UseInterval';
import NoProjectSelected from '../../common/NoProjectSelected';

function IssueTable(): React.ReactElement {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [totalPage, setTotalPage] = useState<number>();
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const selectedPeriod = useSelector((state: RootState) => state.projects.selectedPeriod);

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
          row.project.name,
          row._id,
          row.message,
          row.type,
          new Date(row.occuredAt).toISOString(),
        ];
      }),
    ];
    arrayToCSV(rows);
  };

  const onClickBtn = async () => {
    console.log(input);
    const strArr = input.split(',');
    const temp: any[] = strArr.map((str) => {
      const splited = str.split(':');
      const key = splited[0];
      const val = splited[1];
      const obj: any = {};
      obj[`${key}`] = val;
      if (!key || !val) {
        return undefined;
      }
      return JSON.stringify(obj) as string;
    });
    if (!temp[0]) {
      setQuery([]);
    } else {
      setQuery(temp as string[]);
    }
    console.log(query);
    await getData();
  };
  const onChange = (e: any) => {
    setInput(e.target.value);
  };
  const getData = async () => {
    if (selectedProjectsIds[0] === undefined) return;

    const res = await service.getIssues(selectedProjectsIds, page, selectedPeriod, query);

    if (res.data.data === undefined) {
      setTotalPage(0);
      setIssues([]);
      return;
    }
    setTotalPage(res.data.metaData.totalPage);
    setIssues(res.data.data);
  };

  useInterval(() => getData(), 20000);

  useEffect(() => {
    getData();
  }, [selectedProjectsIds, page, query]);
  return (
    <Box my={1} display="flex" flexDirection="column">
      <TextField
        id="tag-fillter"
        label="Tag-fillter"
        variant="outlined"
        onChange={onChange}
        value={input}
      />
      <Button variant="contained" color="primary" onClick={onClickBtn}>
        submit
      </Button>
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
        <Paper elevation={1}>
          <Box
            display="flex"
            flexDirection="column"
            border="1px solid #cfcfcf"
            borderRadius=".2rem"
          >
            <IssueToolbar />
            {issues[0] ? (
              issues.map((issue) => <IssueListItem key={issue._id} issue={issue} />)
            ) : (
              <NoProjectSelected />
            )}
            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
              <Pagination count={totalPage} page={page} onChange={handlePageChange} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default React.memo(IssueTable);
