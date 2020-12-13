import React from 'react';
import 'billboard.js/dist/billboard.css';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IDailyVisit } from '../../types';

interface IProps {
  dailyVisits: IDailyVisit[];
}
function DailyTable(props: IProps): React.ReactElement {
  const { dailyVisits } = props;
  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell align="right">Month</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Average Stay time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyVisits.map((dailyVisit) => (
                <TableRow
                  key={`${dailyVisit._id.year}-${dailyVisit._id.month}-${dailyVisit._id.date}`}
                >
                  <TableCell component="th" scope="row">
                    {dailyVisit._id.year}
                  </TableCell>
                  <TableCell align="right">{dailyVisit._id.month}</TableCell>
                  <TableCell align="right">{dailyVisit._id.date}</TableCell>
                  <TableCell align="right">{dailyVisit.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default DailyTable;
