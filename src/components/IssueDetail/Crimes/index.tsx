import React, { useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { styled } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import service from '../../../service';

const TableHeadCell = styled(TableCell)({
  fontSize: '16px',
  fontWeight: 'bold',
});

const TableBodyCell = styled(TableCell)({
  fontSize: '14px',
});

const BoldTypography = styled(Typography)({
  fontWeight: 'bold',
});

interface IProps {
  issueId: string | undefined;
}

function Crimes(props: IProps): React.ReactElement {
  const { issueId } = props;
  const [crimes, setCrimes] = useState<any[]>([]);
  const [meta, setMeta] = useState({});
  useEffect(() => {
    (async () => {
      const newCrimes = await service.getCrimes(issueId as string);
      setMeta(newCrimes.data.meta[0]);
      setCrimes(newCrimes.data.data);
    })();
  }, [issueId]);
  return (
    <>
      <TableContainer component="span">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>occuredAt</TableHeadCell>
              <TableHeadCell align="right">Error Type</TableHeadCell>
              <TableHeadCell align="right">Error Message</TableHeadCell>
              <TableHeadCell align="right">Browser</TableHeadCell>
              <TableHeadCell align="right">Name</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crimes.map((crime) => (
              <TableRow key={crime.crimes._id}>
                <TableBodyCell component="th" scope="row">
                  <BoldTypography color="primary">
                    {new Date(crime.crimes.occuredAt).toLocaleString()}
                  </BoldTypography>
                </TableBodyCell>
                <TableBodyCell align="right">{crime.crimes.type}</TableBodyCell>
                <TableBodyCell align="right">{crime.crimes.message}</TableBodyCell>
                <TableBodyCell align="right">{crime.crimes.meta.browser.name}</TableBodyCell>
                <TableBodyCell align="right">{crime.crimes.meta.os.name}</TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Crimes;
