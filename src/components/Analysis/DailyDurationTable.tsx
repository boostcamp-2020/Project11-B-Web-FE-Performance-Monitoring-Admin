import React from 'react';
import {
  Box,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import arrayToCSV from '../../utils/arrayToCSV';

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
interface IProps {
  pageDurationPerDay: IPerDay[];
}

function DailyDurationTable(props: IProps): React.ReactElement {
  const { pageDurationPerDay } = props;
  return (
    <Box my={3}>
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
              {pageDurationPerDay &&
                pageDurationPerDay.map((row: IPerDay) => (
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

export default DailyDurationTable;
