import { Box, Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectDetailUserList from '../components/ProjectDetail/ProjectDetailUserList';
import ProjectDetailHeader from '../components/ProjectDetail/ProjectDetailHeader';
import ProjectUserInfo from '../components/Projects/ProjectsUserInfo';
import InviteMember from '../components/ProjectDetail/InviteMember';

import useProject, { IProject } from '../hooks/ProjectDetailHooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

interface MatchParams {
  id: string;
}

function ProjectDetail(): React.ReactElement {
  const match = useRouteMatch<MatchParams>('/project/:id');
  const projectId = match?.params.id as string;

  const [project, setProjectName, setProjectUsers] = useProject(projectId as string);
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState('');

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
          <InviteMember />
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
