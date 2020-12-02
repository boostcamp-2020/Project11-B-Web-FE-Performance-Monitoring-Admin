import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import UserList from '../components/ProjectDetail/UserList';

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
  const [project, setProject] = useState(initialData);
  /**
   * @TODO
   * projectID로 데이터 받아오기
   */

  return <div>프로젝트 이슈입니다</div>;
}

export default ProjectDetail;
