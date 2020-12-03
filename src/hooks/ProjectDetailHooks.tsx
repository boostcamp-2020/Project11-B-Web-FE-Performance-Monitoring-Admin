import { useState, useEffect } from 'react';
import _ from 'lodash';
import service from '../service';

interface IUser {
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
  owner: string;
}

const useProject = (projectId: string) => {
  const [project, setProject] = useState<IProject>();

  useEffect(() => {
    (async () => {
      const newProject = await service.getProject(projectId);
      setProject(newProject.data);
    })();
  }, []);

  const setProjectName = (name: string) => {
    /**
     * @TODO
     * 서버에 project name 변경하기
     */
    setProject(() => {
      const newProject: IProject = _.cloneDeep(project) as IProject;
      newProject.name = name;
      return newProject;
    });
  };
  const setProjectUsers = (selectedUids: number[]) => {
    setProject(() => {
      const newProject = _.cloneDeep(project) as IProject;
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
export default useProject;
