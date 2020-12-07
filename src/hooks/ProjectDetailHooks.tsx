import { useState, useEffect } from 'react';
import _ from 'lodash';
import service from '../service';

export interface IUser {
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
  owner: IUser;
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
    await service.updateProjectName(projectId, { name });
    setProject(() => {
      const newProject: IProject = _.cloneDeep(project) as IProject;
      newProject.name = name;
      return newProject;
    });
  };

  const setProjectUsers = async (selectedIds: string[]) => {
    await service.deleteProjectUsers(projectId, { userIds: selectedIds });
    setProject(() => {
      const newProject = _.cloneDeep(project) as IProject;
      newProject.users = newProject.users.filter((user) => !selectedIds.includes(user._id));
      return newProject;
    });
  };
  const setProjectOwner = async (originUserId: string, targetUserId: string) => {
    await service.updateProjectOwner(projectId, { originUserId, targetUserId });
    const res = await service.getUser(targetUserId);
    setProject(() => {
      const newProject: IProject = _.cloneDeep(project) as IProject;
      newProject.owner = res.data;
      return newProject;
    });
  };
  return [project, setProjectName, setProjectUsers, setProjectOwner] as const;
};
export default useProject;
