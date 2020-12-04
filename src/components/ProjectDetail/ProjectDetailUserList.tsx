import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import ProjectDetailUserListHead from './ProjectDetailUserListHead';
import ProjectDetailUserListToolbar from './ProjectDetailUserListToolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

interface IUser {
  projects: [];
  _id: number;
  uid: number;
  email: string | null;
  nickname: string;
}

interface IProps {
  users: IUser[];
  deleteUsers: (selectedIds: number[]) => void;
}

export default function UserListTable(props: IProps): React.ReactElement {
  const classes = useStyles();
  const { users, deleteUsers } = props;
  const [selected, setSelected] = useState<number[]>([]);
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const deleteUserAndReset = (selectedUser: number[]) => {
    deleteUsers(selectedUser);
    setSelected([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name: number) => selected.indexOf(name) !== -1;
  return (
    <Box mt={7} className={classes.root}>
      <Paper className={classes.paper}>
        <ProjectDetailUserListToolbar
          numSelected={selected.length}
          deleteUsers={deleteUserAndReset}
          selectedUsers={selected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <ProjectDetailUserListHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={users.length}
            />
            <TableBody>
              {users.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.nickname}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
