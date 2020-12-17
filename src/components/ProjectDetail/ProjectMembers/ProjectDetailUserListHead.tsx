import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

interface IUser {
  uid: number;
  nickname: string;
  email: string;
}

interface HeadCell {
  id: keyof IUser;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  { id: 'nickname', numeric: false, disablePadding: true, label: 'nickname' },
  { id: 'email', numeric: false, disablePadding: false, label: 'email' },
];

interface UserListProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export default function ProjectDetailUserListHead(props: UserListProps): React.ReactElement {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
