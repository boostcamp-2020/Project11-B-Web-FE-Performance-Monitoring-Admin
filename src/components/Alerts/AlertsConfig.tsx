import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import UserList from './UserList';
import { IAlertsUserProfile } from '../../types';
import TimerBtn from '../common/TimerBtn';
import { UserAlertSelector } from '../../hooks/AlertHooks';

interface IProps {
  selector: UserAlertSelector;
  userList?: IAlertsUserProfile[];
  handleUserList: (email: string) => void;
  handleSubmit: (users: string[]) => () => Promise<void>;
}

function AlertsConfig(props: IProps): React.ReactElement {
  const { userList, handleUserList, handleSubmit, selector } = props;
  const { project, period, count } = selector((prev) => prev);
  const selectedUserList = userList?.filter((user) => user.isSelected).map(({ _id }) => _id);
  const canSubmission = Boolean(project && (period || count) && selectedUserList?.length);
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
        <Button
          type="button"
          onClick={handleSubmit(selectedUserList || [])}
          variant="contained"
          color="primary"
          disabled={!canSubmission}
        >
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
