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

export interface IPageMove {
  _id: {
    prevLocation: string;
    presentLocation: string;
  };
  count: number;
}

interface IProps {
  pageMoveData: IPageMove[];
}
function SessionTable(props: IProps): React.ReactElement {
  const { pageMoveData } = props;
  const handleDownload = (): void => {
    if (pageMoveData === undefined) {
      return;
    }
    const rows = [
      ['Before', 'next', 'Hits'],
      ...pageMoveData.map((row) => {
        return [row._id.prevLocation, row._id.presentLocation, row.count];
      }),
    ];
    arrayToCSV(rows);
  };

  return (
    <Box my={3}>
      <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
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
            {pageMoveData &&
              pageMoveData.map((row: any) => (
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
    </Box>
  );
}

export default SessionTable;
