/* eslint-disable prettier/prettier */
import React from 'react';
import ProjectDSN from './ProjectDSN';
import BackNextButtons from './BackNextButtons';

interface IProps {
  dsn: string;
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectDSN(props: IProps): React.ReactElement {
  const { dsn, handleBack, handleNext } = props;

  return (
    <>
      <ProjectDSN dsn={dsn} />
      <BackNextButtons disableBack handleBack={handleBack} handleNext={handleNext} />
    </>
  );
}

export default NewProjectDSN;
