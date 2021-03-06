import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import NewProjectNameInput from '../components/NewProject/NewProjectNameInput';
import NewProjectDescInput from '../components/NewProject/NewProjectDescInput';
import NewProjectConfirm from '../components/NewProject/NewProjectConfirm';
import NewProjectDSN from '../components/NewProject/NewProjectDSN';
import NewProjectInviteMember from '../components/NewProject/NewProjectInviteMember';
import service from '../service';

function NewProject(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreate = async () => {
    const project = {
      name,
      description: desc,
    };
    try {
      const response = await service.addProject(project);
      setProjectId(response.data.projectId);
      handleNext();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  const handleSend = async (emails: string[]) => {
    await service.inviteMembers({
      to: emails,
      project: name,
      projectId,
    });
  };

  const stepProps = [
    {
      label: 'What is your project name?',
      content: (
        <NewProjectNameInput
          name={name}
          setName={setName}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ),
    },
    {
      label: 'Write a short project description',
      content: (
        <NewProjectDescInput
          desc={desc}
          setDesc={setDesc}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ),
    },
    {
      label: 'Create your new project',
      content: (
        <NewProjectConfirm
          name={name}
          desc={desc}
          handleBack={handleBack}
          handleCreate={handleCreate}
        />
      ),
    },
    {
      label: 'Apply the project DSN to your SDK',
      content: (
        <NewProjectDSN projectId={projectId} handleBack={handleBack} handleNext={handleNext} />
      ),
    },
    {
      label: 'Invite members to your project (Optional)',
      content: <NewProjectInviteMember handleBack={handleBack} handleSend={handleSend} />,
    },
  ];

  return (
    <Box p={5} display="flex" flexDirection="column">
      <Stepper activeStep={activeStep} orientation="vertical">
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

export default NewProject;
