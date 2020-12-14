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
  const descText = '아래의 정보대로 프로젝트를 생성하시겠습니까?';
  const confirmText = '확인하셨을 경우 Confirm 버튼을 눌러주세요.';

  return (
    <Box pt={1} display="flex" flexDirection="column">
      <Box pb={2}>
        <Typography>{descText}</Typography>
        <Typography>{confirmText}</Typography>
      </Box>
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
