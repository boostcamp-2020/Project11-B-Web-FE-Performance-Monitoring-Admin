/* eslint-disable prettier/prettier */
import React from 'react';
import ProjectDSN from './ProjectDSN';
import BackNextButtons from './BackNextButtons';

interface IProps {
  projectId: string;
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectDSN(props: IProps): React.ReactElement {
  const { projectId, handleBack, handleNext } = props;

  return (
    <>
      <ProjectDSN projectId={projectId} />
      <BackNextButtons disableBack handleBack={handleBack} handleNext={handleNext} />
    </>
  );
}

export default NewProjectDSN;
