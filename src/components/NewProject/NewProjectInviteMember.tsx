import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, TextField, Snackbar, styled } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import isEmail from 'validator/lib/isEmail';

import BackNextButtons from './BackNextButtons';

const CustomTextField = styled(TextField)({
  width: '300px',
  paddingRight: '10px',
});

interface IProps {
  handleBack: () => void;
}

function NewProjectInviteMember(props: IProps): React.ReactElement {
  const { handleBack } = props;

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [alertText, setAlertText] = useState('');
  const [inputTextError, setInputTextError] = useState(false);

  const labelText = 'Email address';
  const inputErrorText = 'Invalid email address';

  const handleSnackbarClose = (event: any, reason: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSend = () => {
    if (!isEmail(inputText)) {
      setInputTextError(true);
      return;
    }
    // TODO
    // make email inviation API call
    // on success response proceed
    setAlertText(`Sent invitation to ${inputText}`);
    setOpen(true);
    setInputText('');
    setInputTextError(false);
  };

  const handleChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleFinish = () => history.push('/projects');

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" alignItems="center">
        <CustomTextField
          value={inputText}
          error={inputTextError}
          helperText={inputTextError ? inputErrorText : undefined}
          label={labelText}
          onChange={handleChange}
        />
        <Button onClick={handleSend} color="primary" variant="contained">
          Send
        </Button>
      </Box>
      <Snackbar
        open={open}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        autoHideDuration={2500}
      >
        <Alert severity="success">{alertText}</Alert>
      </Snackbar>
      <BackNextButtons rightButtonText="Finish" handleBack={handleBack} handleNext={handleFinish} />
    </Box>
  );
}

export default NewProjectInviteMember;
