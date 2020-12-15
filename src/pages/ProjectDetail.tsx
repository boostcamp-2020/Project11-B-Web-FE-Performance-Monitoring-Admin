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
import ProjectDetailChangeOwner from '../components/ProjectDetail/ProjectDetailChangeOwner';

import useProject from '../hooks/ProjectDetailHooks';

import service from '../service';

interface MatchParams {
  id: string;
}

function ProjectDetail(): React.ReactElement {
  const match = useRouteMatch<MatchParams>('/project/:id');
  const projectId = match?.params.id as string;

  const [project, isOwner, setProjectName, setProjectUsers, setProjectOwner] = useProject(
    projectId as string,
  );

  const dsn = `http://panopticon.gq/api/sdk/${project?._id}`;

  const handleSend = async (emails: string[]) => {
    if (project === undefined) return;
    const name = project.name as string;
    await service.inviteMembers({
      to: emails,
      project: name,
      projectId: project._id,
    });
  };

  const deleteUsers = (selectedUids: string[]): void => {
    setProjectUsers(selectedUids);
  };

  return (
    <>
      {project !== undefined ? (
        <Box p={5} display="flex" flexDirection="column">
          <ProjectDetailHeader
            title={project.name}
            desc={project.description}
            isOwner={isOwner}
            setProjectName={setProjectName}
          />
          <ProjectDetailDialog dsn={dsn} />
          <ProjectUserInfo userName={project.owner.nickname} />
          <ProjectDetailUserList users={project.users} deleteUsers={deleteUsers} />
          {isOwner && (
            <Box>
              <InviteMember handleSend={handleSend} />
              <ProjectDetailChangeOwner
                users={project.users}
                owner={project.owner}
                setProjectOwner={setProjectOwner}
              />
              <ProjectDetailDelete title={project.name} projectId={project._id} />
            </Box>
          )}
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
