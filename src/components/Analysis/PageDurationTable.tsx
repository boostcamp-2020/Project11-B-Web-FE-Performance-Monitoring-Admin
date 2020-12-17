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
  pageDurationData: IDuration[];
}
function SessionTable(props: IProps): React.ReactElement {
  const { pageDurationData } = props;

  return (
    <Box mb={3}>
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
            {pageDurationData &&
              pageDurationData.map((row: IDuration) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row" align="center">
                    {row._id}
                  </TableCell>
                  <TableCell align="center">{(row.sum_duration / 1000).toFixed(1)}</TableCell>
                  <TableCell align="center"> {(row.avg_duration / 1000).toFixed(1)}</TableCell>
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
