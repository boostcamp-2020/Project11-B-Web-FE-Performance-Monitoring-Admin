import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';

import ProjectCard, { IProjectCardProps } from './ProjectCard';
import service from '../../../service';

const sampleProjects: IProjectCardProps[] = [
  {
    _id: '5fc6026191611635d8983358',
    name: 'MyProject1',
    owner: {
      _id: '5fc055d7d58baa2b2807974b',
      uid: 55068119,
      nickname: 'junsushin-dev',
      email: 'junsushin4546@gmail.com',
    },
    users: [
      {
        _id: '5fc5d0f738d1839a9be86541',
        uid: 55068119,
        email: 'earlyhail6@gmail.com',
        nickname: 'EarlyHail',
      },
    ],
  },
  {
    _id: '5fc6026191611635d8983356',
    name: 'MyProject2',
    owner: {
      _id: '5fc7033438d1839a9b14bd79',
      uid: 32405358,
      email: 'junsushin4546@gmail.com',
      nickname: 'junsushin-dev',
    },
    users: [
      {
        _id: '5fc5d0f738d1839a9be86541',
        uid: 55068119,
        email: 'earlyhail6@gmail.com',
        nickname: 'EarlyHail',
      },
      {
        _id: '5fc7205838d1839a9b191373',
        uid: 41819176,
        email: 'saeeng@gmail.com',
        nickname: 'saeeng',
      },
    ],
  },
  {
    _id: '5fc6026191611635d8983357',
    name: 'MyProject3',
    owner: {
      _id: '5fc7033438d1839a9b14bd79',
      uid: 32405358,
      email: 'junsushin4546@gmail.com',
      nickname: 'junsushin-dev',
    },
    users: [
      {
        _id: '5fc5d0f738d1839a9be86541',
        uid: 55068119,
        email: 'earlyhail6@gmail.com',
        nickname: 'EarlyHail',
      },
      {
        _id: '5fc7205838d1839a9b191373',
        uid: 41819176,
        email: 'saeeng@gmail.com',
        nickname: 'saeeng',
      },
    ],
  },
];

function ProjectCards(): React.ReactElement {
  const [projects, setProjects] = useState<IProjectCardProps[]>([]);

  useEffect(() => {
    // TODO: Projects API와 연동 테스트
    // (async () => {
    //   const response = await service.getProjects();
    //   setProjects(response.data.projects);
    // })();
    setProjects(sampleProjects);
  });

  return (
    <Box pt={2}>
      <Grid container spacing={3}>
        {projects.map((props) => (
          <ProjectCard
            key={props._id}
            _id={props._id}
            name={props.name}
            owner={props.owner}
            users={props.users}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default ProjectCards;
