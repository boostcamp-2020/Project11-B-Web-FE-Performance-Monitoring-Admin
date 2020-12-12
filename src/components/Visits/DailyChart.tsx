import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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
import { IDailyVisit, IProjectCardProps } from '../../types';
import { RootState } from '../../modules';

import service from '../../service';

interface IProps {
  year: number;
  month: number;
}

function DailyChart(props: IProps): React.ReactElement {
  const { year, month }: IProps = props;
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectsIds = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  const visitChartDiv = useRef(null);
  useEffect(() => {
    (async (): Promise<void> => {
      const dailyRes = await service.getDailyVisitsMulti(selectedProjectsIds, year, month);
      const newDailyVisits = await dailyRes.data;

      const dateColumns = newDailyVisits[0].map((dailyInfo: IDailyVisit) => {
        return `${dailyInfo._id.year}-${dailyInfo._id.month}-${dailyInfo._id.date}`;
      });
      dateColumns.unshift('x');
      const flatColumns = newDailyVisits.map((dailyArray: IDailyVisit[]) => {
        const currentProjectId = dailyArray[0]._id.projectId;
        const countArray: (string | number)[] = dailyArray.map((dailyInfo: IDailyVisit) => {
          return dailyInfo.count;
        });
        const projectObj = projects.find(
          (project: IProjectCardProps) => project._id === currentProjectId,
        );
        const projectName: string = projectObj?.name as string;
        countArray.unshift(projectName);
        return countArray;
      });
      bb.generate({
        data: {
          x: 'x',
          columns: [dateColumns, ...flatColumns],
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
  }, [selectedProjectsIds, year, month]);
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
            {/* <TableBody>
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
            </TableBody> */}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default DailyChart;
