import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import ProjectDSN from '../NewProject/ProjectDSN';
import BackNextButtons from '../NewProject/BackNextButtons';
import { RootState } from '../../modules';

interface IProps {
  dsn: string;
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectDSN(props: IProps): React.ReactElement {
  const { dsn, handleBack, handleNext } = props;
  const tutorial = useSelector((state: RootState) => state.tutorial);

  return (
    <>
      <Typography>{tutorial.text.korean.copyDsn.description}</Typography>
      <Box p={2}>
        <ProjectDSN dsn={dsn} />
        <Typography>{tutorial.text.korean.copyDsn.initGuide}</Typography>
      </Box>
      <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
    </>
  );
}

export default NewProjectDSN;
