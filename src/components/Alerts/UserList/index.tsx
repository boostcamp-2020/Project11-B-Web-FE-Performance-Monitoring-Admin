import React from 'react';
import Box from '@material-ui/core/Box';
import { IAlertsUserProfile } from '../../../types';
import UserProfile from './UserProfile';

interface IProps {
  userList?: IAlertsUserProfile[];
  handleUserList: (email: string) => void;
}

function UserList(props: IProps): React.ReactElement {
  const { userList, handleUserList } = props;
  return (
    <Box display="flex" px={2} border="1px solid #C4C4C4" borderRadius={3}>
      <Box flex="1" p={2}>
        <Box display="flex" flexWrap="wrap">
          {userList &&
            userList.map(({ email, isSelected }) => (
              <UserProfile
                key={email}
                email={email}
                isSelected={isSelected}
                handleUserList={handleUserList}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
}

UserList.defaultProps = {
  userList: [],
};

export default UserList;
