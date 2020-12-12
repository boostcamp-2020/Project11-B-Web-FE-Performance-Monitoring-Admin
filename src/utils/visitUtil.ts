import bb, { line } from 'billboard.js';
import { IDailyVisit, IProjectCardProps } from '../types';

interface DrawParams {
  projects: IProjectCardProps[];
  newVisits: any;
  visitChartDiv: React.MutableRefObject<null>;
  type: string;
}

const drawVisitsChart = (params: DrawParams): void => {
  const { projects, newVisits, visitChartDiv, type } = params;
  const dateColumns = newVisits[0].map((dailyInfo: IDailyVisit) => {
    const columnFormat = `${dailyInfo._id.year}-${dailyInfo._id.month}`;
    return type === 'daily' ? `${columnFormat}-${dailyInfo._id.date}` : columnFormat;
  });
  dateColumns.unshift('x');
  const flatColumns = newVisits.map((dailyArray: IDailyVisit[]) => {
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
  const xFormat = type === 'daily' ? '%Y-%m-%d' : '%Y-%m';
  try {
    bb.generate({
      data: {
        x: 'x',
        columns: [dateColumns, ...flatColumns],
        xFormat,
        type: line(),
      },
      axis: {
        x: {
          type: 'timeseries',
        },
      },
      bindto: visitChartDiv.current,
    });
    // eslint-disable-next-line no-empty
  } catch (e) {}
};
export default drawVisitsChart;
