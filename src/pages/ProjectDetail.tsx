import Box from '@material-ui/core/Box';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectSettings from '../components/ProjectDetail/ProjectSettings';
import ProjectMembers from '../components/ProjectDetail/ProjectMembers';
import useProject from '../hooks/ProjectDetailHooks';

interface MatchParams {
  id: string;
}

function ProjectDetail(): React.ReactElement {
  const match = useRouteMatch<MatchParams>('/project/:id');
  const projectId = match?.params.id as string;

  const [project, isOwner, setProjectName, setProjectUsers, setProjectOwner] = useProject(
    projectId as string,
  );

  return (
    <>
      {project !== undefined ? (
        <Box p={5} display="flex" flexDirection="column">
          <ProjectSettings
            project={project}
            isOwner={isOwner}
            setProjectName={setProjectName}
            setProjectOwner={setProjectOwner}
          />
          <ProjectMembers project={project} isOwner={isOwner} setProjectUsers={setProjectUsers} />
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
