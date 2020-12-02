import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import UserList from '../components/ProjectDetail/UserList';
import ProjectsHeader from '../components/Projects/ProjectsHeader';
import ProjectUserInfo from '../components/Projects/ProjectsUserInfo';

export interface IUser {
  uid: number;
  nickname: string;
  email: string;
}

export interface IProject {
  name: string;
  description?: string;
  owner: IUser;
  users: IUser[];
}

const initialData: IProject = {
  name: 'Panopticon',
  description: '부스트캠프 11조 B팀 입니다.',
  owner: { uid: 0, nickname: 'boostcamp', email: 'boostcamp.connect.or.kr' },
  users: [
    { uid: 1, nickname: 'juyoungpark718', email: 'junsushin4546@gmail.com' },
    { uid: 2, nickname: 'junsushin-dev', email: 'junsushin-dev@gmail.com' },
    { uid: 3, nickname: 'saeeng', email: 'saeeng@gmail.com' },
    { uid: 4, nickname: 'EarlyHail', email: 'hojin5633@gmail.com' },
  ],
};

interface MatchParams {
  id: string;
}

function ProjectDetail(): React.ReactElement {
  const match = useRouteMatch<MatchParams>('/project/:id');
  const projectId = match?.params.id;
  /**
   * @TODO
   * projectID로 데이터 받아오기
   */
  const [project, setProject] = useState(initialData);
  const deleteUsers = (selectedUids: number[]): void => {
    setProject(() => {
      const newProject = _.cloneDeep(project);
      newProject.users = newProject.users.filter((user) => !selectedUids.includes(user.uid));
      /**
       * @TODO
       * 서버로 API 요청보내서 사용자 정보 지우기
       */
      return newProject;
    });
  };
  return (
    <Box p={5} display="flex" flexDirection="column">
      <ProjectsHeader />
      <Box>{project.description}</Box>
      <ProjectUserInfo />
      <Box>
        <UserList users={project.users} deleteUsers={deleteUsers} />
      </Box>
    </Box>
  );
}

export default ProjectDetail;
