import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import IssueTable from '../components/Issues/IssueTable';
import IssueHeader from '../components/Issues/IssuesHeader';
import ProjectSelector from '../components/Issues/ProjectSelector';
import { IProjectCardProps } from '../types';

function Issue(): React.ReactElement {
  const [selectedProject, setSelectedProject] = useState<IProjectCardProps[]>([]);
  return (
    <>
      <ProjectSelector selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      <Box padding={3}>
        <IssueHeader />
        <IssueTable selectedProject={selectedProject} />
      </Box>
    </>
  );
}

export default Issue;
