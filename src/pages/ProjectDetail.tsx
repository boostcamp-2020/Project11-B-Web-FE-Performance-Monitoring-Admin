import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectDetailUserList from '../components/ProjectDetail/ProjectDetailUserList';
import ProjectDetailHeader from '../components/ProjectDetail/ProjectDetailHeader';
import ProjectUserInfo from '../components/Projects/ProjectsUserInfo';
import InviteMember from '../components/NewProject/InviteMember';

import useProject from '../hooks/ProjectDetailHooks';

import service from '../service';

interface MatchParams {
  id: string;
}

function ProjectDetail(): React.ReactElement {
  const match = useRouteMatch<MatchParams>('/project/:id');
  const projectId = match?.params.id as string;

  const [project, setProjectName, setProjectUsers] = useProject(projectId as string);
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  const handleSend = async (emails: string[]) => {
    const dsn = `http://panopticon.gq/api/errors/${project?._id}`;
    if (!project) return;
    const name = project.name as string;
    await service.inviteMembers({
      to: emails,
      project: name,
      projectId: dsn,
    });
  };

  const startEdit = (name: string) => {
    setTitleInput(() => name);
    setIsEditing(true);
  };
  const endEdit = () => {
    setTitleInput(() => '');
    setIsEditing(false);
  };
  const changeTitle = async () => {
    await setProjectName(titleInput);
    endEdit();
  };
  const titleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(() => target.value);
  };
  const deleteUsers = (selectedUids: number[]): void => {
    setProjectUsers(selectedUids);
  };

  return (
    <>
      {project !== undefined ? (
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
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => startEdit(project.name)}
                  >
                    Edit
                  </Button>
                </Box>
              </>
            )}
          </Box>
          <Box>{project.description}</Box>
          <ProjectUserInfo userName={project.owner} />
          <Box mt={7}>
            <ProjectDetailUserList users={project.users} deleteUsers={deleteUsers} />
          </Box>
          <InviteMember handleSend={handleSend} />
        </Box>
      ) : (
        <Box mt={20} display="flex" flexDirection="column" alignItems="center">
          <CircularProgress size="12rem" />
        </Box>
      )}
    </>
  );
}

export default ProjectDetail;
