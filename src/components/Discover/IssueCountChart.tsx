import React, { useEffect, useRef } from 'react';
import bb, { zoom, bar } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import qs from 'querystring';
import service from '../../service';
import { IProjectCardProps } from '../../types';

interface IIssueCount {
  _id: string;
  type: string;
  message: string;
  crimeCount: number;
  userCount: number;
}
interface IProps {
  selectedProjects: IProjectCardProps[];
}

function IssueCountChart(props: IProps): React.ReactElement {
  const { selectedProjects } = props;
  const chartDiv = useRef(null);
  useEffect(() => {
    (async (): Promise<void> => {
      // const query = qs.stringify(
      //   { projectIds: selectedProjects.map((project) => project._id) },
      //   { addQueryPrefix: true },
      // );
      const query = `?${qs.stringify({
        projectId: selectedProjects.map((project) => {
          return project._id;
        }),
      })}`;
      const res = await service.getCountByIssue(query);
      const statsData = res.data;
      bb.generate({
        data: {
          x: 'x',
          columns: [
            [
              'x',
              ...statsData.map(
                (issue: IIssueCount) => `${issue.type}:${issue.message}:${issue._id}`,
              ),
            ],
            ['Events', ...statsData.map((issue: IIssueCount) => issue.crimeCount)],
            ['Users', ...statsData.map((issue: IIssueCount) => issue.userCount)],
          ],
          types: {
            Events: bar(),
            Users: bar(),
          },
        },
        zoom: {
          enabled: zoom(),
        },

        axis: {
          x: {
            type: 'category',
            tick: {
              multiline: true,
              tooltip: true,
            },
          },
          y: {
            tick: {
              culling: {
                max: 3,
              },
            },
          },
          y2: {
            show: true,
            tick: {
              culling: true,
            },
          },
        },
        bindto: chartDiv.current,
      });
    })();
  }, [selectedProjects]);
  return <div ref={chartDiv} />;
}
export default IssueCountChart;
