import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import UserList from './UserList';
import { IAlertsUserProfile } from '../../types';
import TimerBtn from '../common/TimerBtn';

interface IProps {
  userList?: IAlertsUserProfile[];
  handleUserList: (email: string) => void;
}

function AlertsConfig(props: IProps): React.ReactElement {
  const { userList, handleUserList } = props;
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} mb={1}>
        <Box fontSize="16px">Users</Box>
        <TimerBtn action={() => console.log('refresh!')} count={3} />
      </Box>
      <Box>
        <UserList handleUserList={handleUserList} userList={userList} />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="primary">
          Create Alert
        </Button>
      </Box>
    </Box>
  );
}

AlertsConfig.defaultProps = {
  userList: [],
};

export default AlertsConfig;
