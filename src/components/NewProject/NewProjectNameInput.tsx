import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, styled } from '@material-ui/core';

import BackNextButtons from './BackNextButtons';

const CustomTextField = styled(TextField)({
  maxWidth: '300px',
  paddingBottom: '20px',
});

interface IProps {
  name: string;
  setName: (name: string) => void;
  handleBack: () => void;
  handleNext: () => void;
}

function NewProjectNameInput(props: IProps): React.ReactElement {
  const { name, setName, handleBack, handleNext } = props;
  const labelText = 'Project name';
  const welcomeText = '안녕하세요, Panopticon에 오신 것을 환영합니다!';
  const descText =
    '당신의 App에서 발생한 에러와 퍼포먼스 데이터는 Panopticon에서 프로젝트 단위로 관리됩니다. 새로운 프로젝트의 이름을 적어보세요!';
  const [inputText, setInputText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleClick = () => {
    if (inputText === '') return;
    setName(inputText);
    handleNext();
  };

  useEffect(() => {
    setInputText(name);
  }, [name]);

  return (
    <Box pt={1} display="flex" flexDirection="column">
      <Box pb={1}>
        <Typography>{welcomeText}</Typography>
        <Typography>{descText}</Typography>
      </Box>
      <CustomTextField label={labelText} required defaultValue={name} onChange={handleChange} />
      <BackNextButtons
        disableBack
        disableNext={inputText === ''}
        handleBack={handleBack}
        handleNext={handleClick}
      />
    </Box>
  );
}

export default NewProjectNameInput;
