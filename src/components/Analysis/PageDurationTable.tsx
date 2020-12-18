import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';

const useStyles = makeStyles({
  table: {
    bgColor: 'primary',
    '&.MuiDataGrid-root .MuiDataGrid-colCellTitle': {
      fontWeight: '600',
    },
  },
});
const columns: ColDef[] = [
  { field: 'id', headerName: 'Path', width: 160, flex: 2 },
  {
    field: 'users',
    headerName: 'Users',
    width: 160,
    align: 'right',
    headerAlign: 'right',
    flex: 2,
  },
  {
    field: 'avgTimeperUser',
    headerName: 'Avg Time per User',
    description: '전체 체류 시간 / 유저 수',
    width: 160,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (params: CellParams) => `${params.value} s`,
    flex: 4,
  },
  {
    field: 'hits',
    headerName: 'Hits',
    type: 'number',
    width: 160,
    align: 'right',
    headerAlign: 'right',
    flex: 2,
  },
  {
    field: 'avgTimeperHits',
    headerName: 'Avg Time per Hits',
    description: '전체 체류 시간 / 방문횟수',
    width: 160,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (params: CellParams) => `${params.value} s`,
    flex: 4,
  },
];

interface IDuration {
  _id: string;
  avg_duration: number;
  sum_duration: number;
  count: number;
  userCount: number;
}
interface IProps {
  pageDurationData: IDuration[];
}
function SessionTable(props: IProps): React.ReactElement {
  const { pageDurationData } = props;
  const styles = useStyles();
  return (
    <Box my={3}>
      <Typography variant="h3" id="tableTitle" component="div">
        페이지별 체류시간
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          className={styles.table}
          rows={pageDurationData
            .filter((row) => !!row._id)
            .map((row) => {
              return {
                id: row._id,
                users: row.userCount,
                avgTimeperUser: (row.sum_duration / row.userCount / 1000).toFixed(1),
                hits: row.count,
                avgTimeperHits: (row.avg_duration / 1000).toFixed(1),
              };
            })}
          columns={columns}
          pageSize={10}
        />
      </div>
    </Box>
  );
}

export default SessionTable;
