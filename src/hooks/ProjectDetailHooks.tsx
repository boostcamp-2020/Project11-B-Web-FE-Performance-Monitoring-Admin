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

  const setProjectName = async (name: string) => {
    const result = await service.updateProjectName(projectId, { name });
    if (result.data !== 'OK') {
      /**
       * @TODO
       * 요청 실패할 경우 어떻게 처리
       */
      return;
    }
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
