import React from 'react';

import ProjectUserInfo from '../../Projects/ProjectsUserInfo';
import ProjectDetailUserList from './ProjectDetailUserList';
import ProjectDetailChangeOwner from './ProjectDetailChangeOwner';
import InviteMember from '../../NewProject/InviteMember';
import service from '../../../service';

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

interface IProps {
  project: IProject;
  isOwner: boolean;
  setProjectOwner: (originUserId: string, targetUserId: string) => Promise<void>;
  setProjectUsers: (selectedIds: string[]) => Promise<void>;
}

function ProjectMembers(props: IProps): React.ReactElement {
  const { project, isOwner, setProjectOwner, setProjectUsers } = props;

  const deleteUsers = (selectedUids: string[]): void => {
    setProjectUsers(selectedUids);
  };

  const handleSend = async (emails: string[]) => {
    if (project === undefined) return;
    const name = project.name as string;
    await service.inviteMembers({
      to: emails,
      project: name,
      projectId: project._id,
    });
  };

  return (
    <div>
      <ProjectUserInfo userName={project.owner.nickname} />
      <ProjectDetailUserList users={project.users} isOwner={isOwner} deleteUsers={deleteUsers} />
      <InviteMember handleSend={handleSend} />
      <ProjectDetailChangeOwner
        users={project.users}
        owner={project.owner}
        setProjectOwner={setProjectOwner}
      />
    </div>
  );
}

export default ProjectMembers;
