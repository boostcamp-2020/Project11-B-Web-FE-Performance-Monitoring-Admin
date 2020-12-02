import React, { useState, useEffect } from 'react';
import { Box, TextField, styled } from '@material-ui/core';

import BackNextButtons from './BackNextButtons';

const CustomTextField = styled(TextField)({
  maxWidth: '500px',
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
