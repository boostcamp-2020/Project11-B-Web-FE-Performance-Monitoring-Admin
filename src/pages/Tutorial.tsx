import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import CreateProject from '../components/Tutorial/CreateProject';
import CopyDSN from '../components/Tutorial/CopyDSN';
import GoCodepen from '../components/Tutorial/GoCodepen';
import CheckResults from '../components/Tutorial/CheckResults';
import { RootState } from '../modules';
import { setStep } from '../modules/tutorial';

function Tutorial(): React.ReactElement {
  const tutorial = useSelector((state: RootState) => state.tutorial);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setStep(tutorial.step + 1));
  };

  const handleBack = () => {
    dispatch(setStep(tutorial.step - 1));
  };

  const stepProps = [
    {
      label: 'Create a test project for the tutorial',
      content: <CreateProject handleBack={handleBack} handleNext={handleNext} />,
    },
    {
      label: 'Copy your dsn by clicking on the button',
      content: <CopyDSN dsn={tutorial.dsn} handleBack={handleBack} handleNext={handleNext} />,
    },
    {
      label: 'Head over to Codepen to make some errors',
      content: <GoCodepen handleBack={handleBack} handleNext={handleNext} />,
    },
    {
      label: 'Check how your erros got collected in Issues & Discover',
      content: <CheckResults handleBack={handleBack} handleNext={handleNext} />,
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
