import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, styled } from '@material-ui/core';

import BackNextButtons from './BackNextButtons';

const CustomTextField = styled(TextField)({
  maxWidth: '500px',
  paddingBottom: '20px',
});

interface IProps {
  desc: string;
  setDesc: (desc: string) => void;
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectDescInput(props: IProps): React.ReactElement {
  const { desc, setDesc, handleBack, handleNext } = props;
  const labelText = 'Project description';
  const descText =
    '당신의 프로젝트를 설명하기 위한 간단한 내용을 적어주세요. 필요하시지 않을 경우 생략하셔도 됩니다.';
  const [inputText, setInputText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleClick = () => {
    setDesc(inputText);
    handleNext();
  };

  useEffect(() => {
    setInputText(desc);
  }, [desc]);

  return (
    <Box pt={1} display="flex" flexDirection="column">
      <Box pb={2}>
        <Typography>{descText}</Typography>
      </Box>
      <CustomTextField
        multiline
        label={labelText}
        rows={3}
        variant="outlined"
        onChange={handleChange}
        defaultValue={desc}
      />
      <BackNextButtons handleBack={handleBack} handleNext={handleClick} />
    </Box>
  );
}

export default NewProjectDescInput;
