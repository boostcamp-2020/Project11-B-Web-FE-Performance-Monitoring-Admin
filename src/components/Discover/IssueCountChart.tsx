import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import bb, { zoom, bar } from 'billboard.js';
import 'billboard.js/dist/billboard.css';
import qs from 'querystring';
import service from '../../service';
import { RootState } from '../../modules';

interface IIssueCount {
  _id: string;
  type: string;
  message: string;
  crimeCount: number;
  userCount: number;
}
interface IProps {
  filterQuery: Record<string, string[] | undefined>;
}

function IssueCountChart(props: IProps): React.ReactElement {
  const { filterQuery } = props;
  const chartDiv = useRef(null);
  const selectedProjects = useSelector((state: RootState) => state.projects.selectedProjectsIds);
  useEffect(() => {
    (async (): Promise<void> => {
      const query = `?${qs.stringify({
        projectId: selectedProjects,
        ...filterQuery,
      })}`;
      try {
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
        // eslint-disable-next-line no-empty
      } catch (e) {}
    })();
  }, [selectedProjects, filterQuery]);
  return <div ref={chartDiv} />;
}
export default IssueCountChart;
