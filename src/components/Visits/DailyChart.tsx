import React, { useState, useEffect, useRef } from 'react';
import bb, { line, zoom } from 'billboard.js';
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

import service from '../../service';

interface IProps {
  projectId: string;
  year: number;
  month: number;
}

interface ICustomDate extends IProps {
  date: number;
}

function DailyChart(props: IProps): React.ReactElement {
  const { projectId, year, month }: IProps = props;
  const [dailyVisits, setDailyVisits] = useState<IDailyVisit[]>([]);
  const visitChartDiv = useRef(null);
  useEffect(() => {
    const formatTime = (inputDate: ICustomDate): string => {
      return `${inputDate.year}-${inputDate.month}-${inputDate.date}`;
    };
    (async (): Promise<void> => {
      const dailyRes = await service.getDailyVisits(projectId, year, month);
      const newDailyVisits: IDailyVisit[] = await dailyRes.data;
      setDailyVisits(() => newDailyVisits);
      bb.generate({
        data: {
          x: 'x',
          json: {
            visits: newDailyVisits.map((count: any) => count.count),
            x: newDailyVisits.map((date: any) => formatTime(date._id)),
          },
          type: line(),
          xFormat: '%Y-%m-%d',
        },
        axis: {
          x: {
            type: 'timeseries',
          },
        },
        bindto: visitChartDiv.current,
      });
    })();
  }, [projectId, year, month]);
  return (
    <>
      <div ref={visitChartDiv} />
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

export default DailyChart;
