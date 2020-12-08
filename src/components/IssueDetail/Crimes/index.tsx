import React, { useEffect, useState } from 'react';

import { Box, styled } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

import service from '../../../service';
import { ICrime, ICrimesMeta } from '../../../types';

const TableHeadCell = styled(TableCell)({
  fontSize: '16px',
  fontWeight: 'bold',
});

const TableBodyCell = styled(TableCell)({
  fontSize: '14px',
});

const BoldTypography = styled(Typography)({
  fontWeight: 'bold',
  padding: 0,
  cursor: 'pointer',
});

interface IProps {
  issueId: string | undefined;
  setCrimeById: (crimeId: string) => void;
}

interface ICrimeObj {
  crimes: ICrime;
}

function Crimes(props: IProps): React.ReactElement {
  const { issueId, setCrimeById } = props;
  const [crimes, setCrimes] = useState<ICrimeObj[]>([]);
  const [meta, setMeta] = useState<ICrimesMeta>();
  const [pageNum, setPageNum] = useState<number>(1);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNum(value);
  };

  useEffect(() => {
    (async () => {
      const newCrimes = await service.getCrimes(issueId as string, pageNum);
      setMeta(newCrimes.data.meta[0]);
      setCrimes(newCrimes.data.data);
    })();
  }, [issueId, pageNum]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>OccuredAt</TableHeadCell>
              <TableHeadCell align="right">Error Type</TableHeadCell>
              <TableHeadCell align="right">Error Message</TableHeadCell>
              <TableHeadCell align="right">Browser</TableHeadCell>
              <TableHeadCell align="right">Name</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crimes.map(({ crimes: crime }) => (
              <TableRow key={crime._id}>
                <TableBodyCell scope="row">
                  <BoldTypography color="primary" onClick={() => setCrimeById(crime._id)}>
                    {new Date(crime.occuredAt).toLocaleString()}
                  </BoldTypography>
                </TableBodyCell>
                <TableBodyCell align="right">{crime.type}</TableBodyCell>
                <TableBodyCell align="right">{crime.message}</TableBodyCell>
                <TableBodyCell align="right">{crime.meta.browser.name}</TableBodyCell>
                <TableBodyCell align="right">{crime.meta.os.name}</TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" pt={2}>
        <Pagination count={meta?.totalPage} page={pageNum} onChange={changePage} />
      </Box>
    </div>
  );
}

export default Crimes;
