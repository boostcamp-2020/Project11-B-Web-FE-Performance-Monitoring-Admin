import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailDialog from './ProjectDetailDialog';
import ProjectDetailOwner from './ProjectDetailOwner';
import ProjectDetailChangeOwner from './ProjectDetailChangeOwner';
import ProjectDetailDelete from './ProjectDetailDelete';

const useStyles = makeStyles({
  box: {
    position: 'relative',
    margin: '16px',
  },
});
export interface IUser {
  projects: [];
  _id: string;
  uid: number;
  email: string | null;
  nickname: string;
}

export interface IProject {
  users: IUser[];
  _id: string;
  name: string;
  description: string;
  owner: IUser;
}

interface IProps {
  project: IProject;
  isOwner: boolean;
  setProjectName: (name: string) => Promise<void>;
  setProjectOwner: (originUserId: string, targetUserId: string) => Promise<void>;
}

function ProjectSettings(props: IProps): React.ReactElement {
  const { project, isOwner, setProjectName, setProjectOwner } = props;
  const classes = useStyles();

  const dsn = `http://panopticon.gq/api/sdk/${project?._id}`;

  return (
    <Paper>
      <Box className={classes.box}>
        <ProjectDetailHeader
          title={project.name}
          desc={project.description}
          isOwner={isOwner}
          setProjectName={setProjectName}
        />
        <ProjectDetailDialog dsn={dsn} />
        <ProjectDetailOwner name={project.owner.nickname} />
        {isOwner && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <ProjectDetailChangeOwner
              users={project.users}
              owner={project.owner}
              setProjectOwner={setProjectOwner}
            />
            <ProjectDetailDelete title={project.name} projectId={project._id} />
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default ProjectSettings;
