/**
 * @TODO
 * New Project의 메일 기능과 동일한 컴포넌트, 리팩토링 필요함
 */

import React, { useState } from 'react';
import { Box, Button, TextField, Snackbar, styled } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import isEmail from 'validator/lib/isEmail';

const CustomTextField = styled(TextField)({
  width: '300px',
  paddingRight: '10px',
});

function NewProjectInviteMember(): React.ReactElement {
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
    </Box>
  );
}

export default NewProjectInviteMember;
