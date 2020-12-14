import React from 'react';
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

import arrayToCSV from '../../utils/arrayToCSV';

interface IDuration {
  _id: string;
  avg_duration: number;
  sum_duration: number;
  count: number;
}
interface IProps {
  durationData: IDuration[];
}
function SessionTable(props: IProps): React.ReactElement {
  const { durationData } = props;

  return (
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
  );
}

export default SessionTable;
