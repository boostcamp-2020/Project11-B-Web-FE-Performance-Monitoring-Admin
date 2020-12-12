import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import qs from 'querystring';
import { useSelector } from 'react-redux';

import { RootState } from '../../modules';
import service from '../../service';
import arrayToCSV from '../../utils/arrayToCSV';

interface IMove {
  _id: {
    prevLocation: string;
    presentLocation: string;
  };
  count: number;
}
interface IDuration {
  _id: string;
  avg_duration: number;
  sum_duration: number;
  count: number;
}
interface IPerDay {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  sum_duration: number;
  avg_duration: number;
  count: number;
}
function SessionTable(): React.ReactElement {
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);

  const [perDay, setPerDay] = useState<IPerDay[] | undefined>(undefined);
  const [moveData, setMoveData] = useState<IMove[] | undefined>(undefined);
  const [durationData, setDurationData] = useState<IDuration[] | undefined>(undefined);
  const handleDownload = (): void => {
    if (moveData === undefined) {
      return;
    }
    const rows = [
      ['Before', 'next', 'Hits'],
      ...moveData.map((row) => {
        return [row._id.prevLocation, row._id.presentLocation, row.count];
      }),
    ];
    arrayToCSV(rows);
  };
  useEffect(() => {
    (async () => {
      const query = `?${qs.stringify({
        projectId: selectedProjectsIds,
      })}`;
      const res = await service.getSession(query);
      if (!res.data) {
        return;
      }
      setMoveData(res.data.move);
      setDurationData(res.data.duration);
      setPerDay(res.data.perDay);
    })();
  }, [selectedProjectsIds]);
  return (
    <Box my={3}>
      <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" id="tableTitle" component="span">
          페이지간 이동 추이
        </Typography>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => {
            handleDownload();
          }}
        >
          DOWNLOAD
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Before</TableCell>
              <TableCell align="center">Next</TableCell>
              <TableCell align="center">Hits</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moveData &&
              moveData.map((row: any) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" align="center">
                    {row._id.prevLocation}
                  </TableCell>
                  <TableCell align="center"> {row._id.presentLocation}</TableCell>
                  <TableCell align="center"> {row.count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box my={3}>
        <Typography variant="h3" id="tableTitle" component="div">
          페이지별 체류시간
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Path</TableCell>
                <TableCell align="center">
                  Overall Time <small>(s)</small>
                </TableCell>
                <TableCell align="center">
                  Avg Time <small>(s)</small>
                </TableCell>
                <TableCell align="center">Hits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {durationData &&
                durationData.map((row: IDuration) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row" align="center">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.sum_duration / 1000}</TableCell>
                    <TableCell align="center"> {row.avg_duration / 1000}</TableCell>
                    <TableCell align="center"> {row.count}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box my={3}>
        <Typography variant="h3" id="tableTitle" component="div">
          일별 체류시간
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">
                  Overall Time <small>(s)</small>
                </TableCell>
                <TableCell align="center">
                  Avg Time <small>(s)</small>
                </TableCell>
                <TableCell align="center">Hits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {perDay &&
                perDay.map((row: IPerDay) => (
                  <TableRow key={`${row._id.year}-${row._id.month}-${row._id.day}`}>
                    <TableCell component="th" scope="row" align="center">
                      {`${row._id.year}-${row._id.month}-${row._id.day}`}
                    </TableCell>
                    <TableCell align="center">{row.sum_duration / 1000}</TableCell>
                    <TableCell align="center"> {row.avg_duration / 1000}</TableCell>
                    <TableCell align="center"> {row.count}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default SessionTable;
