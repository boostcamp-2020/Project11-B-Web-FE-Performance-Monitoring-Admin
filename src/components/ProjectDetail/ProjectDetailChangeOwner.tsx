import React, { useContext, useState } from 'react';
import { Box, Button, styled } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';

import UserContext from '../../context';
import service from '../../service';

import { IUser } from '../../hooks/ProjectDetailHooks';

const CustomSelect = styled(Select)({
  margin: '0px',
  minWidth: '100px',
  padding: '0 7px',
});

interface IProps {
  owner: IUser;
  users: IUser[];
  setProjectOwner: (originUserId: string, targetUserId: string) => Promise<void>;
}

function ProjectsUserInfo(props: IProps): React.ReactElement {
  const { owner, users, setProjectOwner } = props;
  const { user: globalUser } = useContext(UserContext);
  const [changing, setChanging] = useState(false);
  const [targetUserName, setTargetUserName] = useState('');
  const startChangeOwner = () => {
    setChanging(() => !changing);
  };

  const changeTargetUser = ({ target }: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const value = target.value as string;
    setTargetUserName(() => value);
  };

  const cancelChange = () => {
    setChanging(() => false);
    setTargetUserName(() => '');
  };

  const saveChange = async () => {
    const originUserId = owner._id;
    const targetUser = users.find((user) => user.nickname === targetUserName);
    if (targetUser === undefined) return;
    const targetUserId = targetUser._id;
    await setProjectOwner(originUserId, targetUserId); // const result = await service.updateProjectOwner(projectId, { originUserId, targetUserId });
  };

  return (
    <Box mt={10} display="flex" flex-direction="row" justifyContent="flex-start">
      {owner.nickname === globalUser.nickname && (
        <Box>
          <Button
            color="primary"
            size="large"
            onClick={() => startChangeOwner()}
            style={{ textTransform: 'none' }}
          >
            Change Owner
          </Button>
          {changing === true && (
            <Box ml={1} display="flex" flexDirection="row">
              <CustomSelect value={targetUserName} onChange={changeTargetUser}>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user.nickname}>
                    {user.nickname}
                  </MenuItem>
                ))}
              </CustomSelect>
              <Box ml={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  startIcon={<SaveIcon />}
                  onClick={saveChange}
                >
                  Save
                </Button>
              </Box>
              <Box ml={1}>
                <Button variant="contained" color="secondary" size="medium" onClick={cancelChange}>
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ProjectsUserInfo;
