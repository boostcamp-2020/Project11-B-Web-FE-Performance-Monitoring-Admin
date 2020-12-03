import React, { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Chip, TextField, Snackbar, styled } from '@material-ui/core';
import { Email as EmailIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import isEmail from 'validator/lib/isEmail';

import BackNextButtons from './BackNextButtons';

const EmailInput = styled(TextField)({
  width: '300px',
  paddingRight: '10px',
});

const CustomButton = styled(Button)({
  marginLeft: '10px',
});

const EmailChip = styled(Chip)({
  paddingLeft: '5px',
  margin: '5px',
});

interface IProps {
  handleBack: () => void;
  handleSend: (emails: string[]) => Promise<void>;
}

function NewProjectInviteMember(props: IProps): React.ReactElement {
  const { handleBack, handleSend } = props;

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [alertText, setAlertText] = useState('');
  const [inputTextError, setInputTextError] = useState(false);
  const [emails, setEmails] = useState([] as string[]);

  const labelText = 'Email address';
  const inputErrorText = 'Invalid email address';

  const handleSnackbarClose = (event: any, reason: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleAdd = () => {
    if (!isEmail(inputText)) {
      setInputTextError(true);
      return;
    }
    setEmails((prev) => [...prev, inputText]);
    setInputText('');
    setInputTextError(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendClick = async () => {
    if (inputText !== '') handleAdd();
    try {
      await handleSend(emails);
      setAlertText(`Sent invitation to ${emails.length} member${emails.length > 1 ? 's' : ''}`);
      setOpen(true);
      setEmails([]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFinish = () => history.push('/projects');

  const handleEmailDelete = (email: string) => {
    setEmails((prev) => prev.filter((item) => item !== email));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" flexDirection="row" alignItems="center">
        <EmailInput
          value={inputText}
          error={inputTextError}
          helperText={inputTextError ? inputErrorText : undefined}
          label={labelText}
          onChange={handleChange}
        />
        <CustomButton onClick={handleAdd} color="primary" variant="contained">
          Add
        </CustomButton>
        <CustomButton onClick={handleSendClick} color="primary" variant="contained">
          Send
        </CustomButton>
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
      <Box pt={1}>
        {emails.map((email) => (
          <EmailChip
            key={email}
            icon={<EmailIcon />}
            label={email}
            onDelete={() => handleEmailDelete(email)}
          />
        ))}
      </Box>
      <BackNextButtons rightButtonText="Finish" handleBack={handleBack} handleNext={handleFinish} />
    </Box>
  );
}

export default NewProjectInviteMember;
