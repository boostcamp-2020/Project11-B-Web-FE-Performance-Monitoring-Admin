import Box from '@material-ui/core/Box';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectDetailUserList from '../components/ProjectDetail/ProjectDetailUserList';
import ProjectDetailHeader from '../components/ProjectDetail/ProjectDetailHeader';
import ProjectUserInfo from '../components/Projects/ProjectsUserInfo';
import InviteMember from '../components/NewProject/InviteMember';
import ProjectDetailDialog from '../components/ProjectDetail/ProjectDetailDialog';
import ProjectDetailDelete from '../components/ProjectDetail/ProjectDetailDelete';

import useProject from '../hooks/ProjectDetailHooks';

import service from '../service';

interface MatchParams {
  id: string;
}

function ProjectDetail(): React.ReactElement {
  const match = useRouteMatch<MatchParams>('/project/:id');
  const projectId = match?.params.id as string;

  const [project, setProjectName, setProjectUsers] = useProject(projectId as string);

  const dsn = `http://panopticon.gq/api/errors/${project?._id}`;

  const handleSend = async (emails: string[]) => {
    if (!project) return;
    const name = project.name as string;
    await service.inviteMembers({
      to: emails,
      project: name,
      projectId: dsn,
    });
  };

  const deleteUsers = (selectedUids: number[]): void => {
    setProjectUsers(selectedUids);
  };

  return (
    <>
      {project !== undefined ? (
        <Box p={5} display="flex" flexDirection="column">
          <ProjectDetailHeader title={project.name} setProjectName={setProjectName} />
          <Box>{project.description}</Box>
          <ProjectDetailDialog dsn={dsn} />
          <ProjectUserInfo userName={project.owner.nickname} />
          <ProjectDetailUserList users={project.users} deleteUsers={deleteUsers} />
          <InviteMember handleSend={handleSend} />
          <ProjectDetailDelete title={project.name} projectId={project._id} />
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
