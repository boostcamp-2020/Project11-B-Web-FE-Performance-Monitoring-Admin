import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chip: {
    margin: '0 8px',
  },
});

interface IProps {
  email: string;
  isSelected: boolean;
  handleUserList: (email: string) => void;
}

function UserProfile(props: IProps): React.ReactElement {
  const { email, isSelected, handleUserList } = props;
  const classes = useStyles();
  return (
    <Chip
      className={classes.chip}
      label={email}
      clickable
      color={isSelected ? 'primary' : undefined}
      onClick={() => handleUserList(email)}
    />
  );
}

export default UserProfile;
