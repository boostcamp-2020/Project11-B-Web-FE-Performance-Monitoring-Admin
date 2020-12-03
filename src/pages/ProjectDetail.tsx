import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import ProjectDetailUserList from '../components/ProjectDetail/ProjectDetailUserList';
import ProjectDetailHeader from '../components/ProjectDetail/ProjectDetailHeader';
import ProjectUserInfo from '../components/Projects/ProjectsUserInfo';
import InviteMember from '../components/ProjectDetail/InviteMember';

import useProject from '../hooks/ProjectDetailHooks';

interface MatchParams {
  id: string;
}

function ProjectDetail(): React.ReactElement {
  const match = useRouteMatch<MatchParams>('/project/:id');
  const projectId = match?.params.id;

  const [project, setProjectName, setProjectUsers] = useProject(projectId as string);
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  const startEdit = () => {
    setTitleInput(() => project.name);
    setIsEditing(true);
  };
  const endEdit = () => {
    setTitleInput(() => '');
    setIsEditing(false);
  };
  const changeTitle = () => {
    setProjectName(titleInput);
    endEdit();
  };
  const titleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(() => target.value);
  };
  const deleteUsers = (selectedUids: number[]): void => {
    setProjectUsers(selectedUids);
  };

  return (
    <Box p={5} display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" alignItems="center">
        {isEditing ? (
          <>
            <TextField
              id="standard-basic"
              value={titleInput}
              onChange={titleInputChange}
              inputProps={{ style: { fontSize: 30, fontWeight: 'bold' } }}
            />
            <Box ml={5}>
              <Button variant="outlined" color="primary" size="small" onClick={changeTitle}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" size="small" onClick={endEdit}>
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <ProjectDetailHeader title={project.name} />
            <Box ml={5}>
              <Button variant="outlined" color="primary" size="small" onClick={startEdit}>
                Edit
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Box>{project.description}</Box>
      <ProjectUserInfo userName={project.owner.nickname} />
      <Box mt={7}>
        <ProjectDetailUserList users={project.users} deleteUsers={deleteUsers} />
      </Box>
      <InviteMember />
    </Box>
  );
}

export default ProjectDetail;
