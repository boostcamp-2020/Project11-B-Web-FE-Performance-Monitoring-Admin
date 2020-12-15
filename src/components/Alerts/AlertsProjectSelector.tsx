import React from 'react';
import Selector from './Selector';
import { IProjectCardProps } from '../../types';

interface IProps {
  projectId: string;
  projectList: IProjectCardProps[];
  handleSelectProject: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

function AlertsProjectSelector(props: IProps): React.ReactElement {
  const { projectId, handleSelectProject, projectList } = props;
  const menuList = projectList.map((project) => ({ name: project.name, value: project._id }));
  return (
    <Selector
      title="Project"
      value={projectId}
      handleSelect={handleSelectProject}
      menuList={menuList}
    />
  );
}

export default AlertsProjectSelector;
