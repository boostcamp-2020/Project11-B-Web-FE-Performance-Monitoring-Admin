import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import CreateProject from '../components/Tutorial/CreateProject';
import CopyDSN from '../components/Tutorial/CopyDSN';
import GoCodepen from '../components/Tutorial/GoCodepen';
import CheckResults from '../components/Tutorial/CheckResults';
import { RootState } from '../modules';
import { setStep } from '../modules/tutorial';

function Tutorial(): React.ReactElement {
  const tutorial = useSelector((state: RootState) => state.tutorial);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNext = () => {
    dispatch(setStep(tutorial.step + 1));
  };

  const handleBack = () => {
    dispatch(setStep(tutorial.step - 1));
  };

  const handleFinish = () => {
    history.push('/projects');
  };

  const { labels } = tutorial.text.korean;

  const stepProps = [
    {
      label: labels.createProject,
      content: <CreateProject handleBack={handleBack} handleNext={handleNext} />,
    },
    {
      label: labels.copyDsn,
      content: <CopyDSN dsn={tutorial.dsn} handleBack={handleBack} handleNext={handleNext} />,
    },
    {
      label: labels.goCodepen,
      content: <GoCodepen handleBack={handleBack} handleNext={handleNext} />,
    },
    {
      label: labels.checkResults,
      content: <CheckResults handleBack={handleBack} handleNext={handleFinish} />,
    },
  ];

  return (
    <Box p={5} display="flex" flexDirection="column">
      <Stepper activeStep={tutorial.step} orientation="vertical">
        {stepProps.map(({ label, content }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>{content}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default React.memo(Tutorial);
