import React, { useState } from 'react';
import _ from 'lodash';

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

const useProject = (projectId: string) => {
  /**
   * @TODO
   * projectID로 데이터 받아오기
   */
  const [project, setProject] = useState(initialData);
  const setProjectName = (name: string) => {
    /**
     * @TODO
     * 서버에 project name 변경하기
     */
    setProject(() => {
      const newProject = _.cloneDeep(project);
      newProject.name = name;
      return newProject;
    });
  };
  const setProjectUsers = (selectedUids: number[]) => {
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
  return [project, setProjectName, setProjectUsers] as const;
};
export { useProject };
