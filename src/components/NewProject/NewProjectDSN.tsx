/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, Button, Snackbar, IconButton, Tooltip, Typography, styled } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import * as clipboard from "clipboard-polyfill/text";

import BackNextButtons from './BackNextButtons';

interface IProps {
  dsn: string;
  handleBack: () => void;
  handleNext: () => void;
}

const LowercaseButton = styled(Button)({
  textTransform: 'none',
  alignSelf: 'flex-start',
});

dark.hljs.padding = '10px';

const makeCodeSnippet = (dsn:string) => {
  return `import Panopticon from 'pan-opt';
  
const dsn = '${dsn}'

Panopticon.init(dsn);`;
}

function NewProjectDSN(props: IProps): React.ReactElement {
  const { dsn, handleBack, handleNext } = props;

  const [open, setOpen] = useState(false);
  const tooltipMessage = 'Click to copy to clipboard';
  const alertMessage = 'DSN copied to clipboard';

  const handleClick = () => {
    clipboard.writeText(dsn);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSnackbarClose = (event: any, reason: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>Your project DSN -</Typography>
        <Tooltip title={tooltipMessage}>
          <LowercaseButton onClick={handleClick} color="primary">
            {dsn}
          </LowercaseButton>
        </Tooltip>
        <Snackbar
          open={open}
          onClose={handleSnackbarClose}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
          autoHideDuration={2500}
          message={alertMessage}
          action={(
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
        )}
        />
      </Box>
      <SyntaxHighlighter language="javascript" style={dark}>
        {makeCodeSnippet(dsn)}
      </SyntaxHighlighter>
      <BackNextButtons disableBack handleBack={handleBack} handleNext={handleNext} />
    </Box>
  );
}

export default NewProjectDSN;
