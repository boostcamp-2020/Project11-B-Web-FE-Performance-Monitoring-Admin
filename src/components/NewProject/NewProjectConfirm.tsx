import React from 'react';
import { Box, Paper, Typography, styled } from '@material-ui/core';

import BackNextButtons from './BackNextButtons';

interface IProps {
  name: string;
  desc: string;
  handleBack: () => void;
  handleCreate: () => void;
}

const CustomPaper = styled(Paper)({
  maxWidth: '500px',
  padding: '15px',
  marginBottom: '20px',
});

function NewProjectConfirm(props: IProps): React.ReactElement {
  const { name, desc, handleBack, handleCreate } = props;

  return (
    <Box pt={1} display="flex" flexDirection="column">
      <CustomPaper elevation={3} variant="outlined">
        <Typography variant="h3" color="primary">
          {name}
        </Typography>
        <Box pt={1}>
          <Typography variant="body2">{desc}</Typography>
        </Box>
      </CustomPaper>
      <BackNextButtons
        rightButtonText="Confirm"
        handleBack={handleBack}
        handleNext={handleCreate}
      />
    </Box>
  );
}

export default NewProjectConfirm;
