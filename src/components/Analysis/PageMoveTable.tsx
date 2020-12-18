import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import arrayToCSV from '../../utils/arrayToCSV';

const OUT_OF_DOMAIN = 'Out of Domain';

const useStyles = makeStyles({
  table: {
    bgColor: 'primary',
    '&.MuiDataGrid-root .MuiDataGrid-colCellTitle': {
      fontWeight: '600',
    },
  },
});
const columns: ColDef[] = [
  {
    field: 'before',
    headerName: 'Before',
    align: 'center',
    headerAlign: 'center',
    flex: 4,
  },
  {
    field: 'next',
    headerName: 'Next',
    align: 'center',
    headerAlign: 'center',
    flex: 4,
  },
  {
    field: 'hits',
    headerName: 'Hits',
    align: 'center',
    headerAlign: 'center',
    flex: 2,
  },
];
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
  const styles = useStyles();
  const handleDownload = (): void => {
    if (pageMoveData === undefined) {
      return;
    }
    const rows = [
      ...pageMoveData.map((row) => {
        return [row._id.prevLocation, row._id.presentLocation, row.count];
      }),
    ];
    arrayToCSV(rows);
  };

  return (
    <Box my={3}>
      <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" id="tableTitle" component="span">
          페이지간 이동 추이
        </Typography>
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

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          className={styles.table}
          rows={pageMoveData.map((row) => {
            return {
              id: row._id.prevLocation + row._id.presentLocation,
              before: row._id.prevLocation || OUT_OF_DOMAIN,
              next: row._id.presentLocation || OUT_OF_DOMAIN,
              hits: row.count,
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
