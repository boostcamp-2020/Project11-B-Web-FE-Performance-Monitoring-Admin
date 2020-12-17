import React from 'react';
import Selector from './Selector';
import { IProjectCardProps } from '../../types';

interface IProps {
  project: IProjectCardProps | undefined;
  projectList: IProjectCardProps[];
  handleSelectProject: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

function AlertsProjectSelector(props: IProps): React.ReactElement {
  const { project, handleSelectProject, projectList } = props;
  const menuList = projectList.map((proj) => ({ name: proj.name, value: proj._id }));
  return (
    <>
      <Selector
        readOnly={false}
        title="Project"
        value={project ? project._id : ''}
        handleSelect={handleSelectProject}
        menuList={menuList}
      />
    </>
  );
}

export default AlertsProjectSelector;
