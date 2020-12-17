import React, { useState } from 'react';
import {
  Box,
  Button,
  Snackbar,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  styled,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import * as clipboard from 'clipboard-polyfill/text';

interface IProps {
  textContent: string;
}

const LeftPaddingButton = styled(Button)({
  marginLeft: '10px',
});

function CopyClipboardBox(props: IProps): React.ReactElement {
  const { textContent } = props;

  const [open, setOpen] = useState(false);

  const tooltipText = 'Cick to Copy to Clipboard';
  const alertText = 'Copied to Clipboard';

  const handleClick = () => {
    clipboard.writeText(textContent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event: any, reason: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Paper>
        <Box p={1} bgcolor="#EEEEEE" display="flex" flexDirection="row" alignItems="center">
          <Typography>{textContent}</Typography>
          <Tooltip title={tooltipText}>
            <LeftPaddingButton onClick={handleClick} color="primary" variant="contained">
              Copy
            </LeftPaddingButton>
          </Tooltip>
        </Box>
      </Paper>
      <Snackbar
        open={open}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={2500}
        message={alertText}
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <IconButton color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Box>
  );
}

export default CopyClipboardBox;
