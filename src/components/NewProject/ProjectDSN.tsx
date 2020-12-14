/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, Button, Snackbar, IconButton, Paper, Tooltip, Typography, styled } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import * as clipboard from 'clipboard-polyfill/text';

interface IProps {
  dsn: string;
}

const LeftPaddingButton = styled(Button)({
  marginLeft: '10px',
});

dark.hljs.padding = '10px';

const makeCodeSnippet = (dsn: string) => {
  return `import Panopticon from 'pan-opt';
  
const dsn = '${dsn}'

Panopticon.init(dsn);`;
};

function NewProjectDSN(props: IProps): React.ReactElement {
  const { dsn } = props;

  const [open, setOpen] = useState(false);
  const congratsText = '축하합니다! 새로운 프로젝트가 생성되었어요. 아래에서 프로젝트에 부여된 고유한 주소인 DSN을 확인할 수 있습니다.';
  const descText = 'npm install pan-opt 명령어를 이용해서 Panopticon SDK를 설치하고, 예시 코드를 참조해서 프로젝트에 Panopticon을 적용해 보세요. 프로젝트에 직접 적용하기 이전에 기능들을 살펴보고 싶다면 샘플 데이터를 생성해 보세요.';
  const createSampleText = '샘플 데이터 생성';
  const tooltipText = 'Cick to Copy to Clipboard';
  const alertText = 'DSN Copied to Clipboard';

  const handleClick = () => {
    clipboard.writeText(dsn);
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
    <Box display="flex" flexDirection="column">
      <Typography>{congratsText}</Typography>
      <Box pt={2} pb={2} display="flex" flexDirection="column" alignItems="flex-start">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Paper>
            <Box p={1} bgcolor="#EEEEEE" display="flex" flexDirection="row" alignItems="center">
              <Typography>{dsn}</Typography>
              <Tooltip title={tooltipText}>
                <LeftPaddingButton onClick={handleClick} color="primary" variant="contained">
                  Copy
                </LeftPaddingButton>
              </Tooltip>    
            </Box>
          </Paper>
        </Box>
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
      <Typography>{descText}</Typography>
      <SyntaxHighlighter language="javascript" style={dark}>
        {makeCodeSnippet(dsn)}
      </SyntaxHighlighter>
    </Box>
  );
}

export default NewProjectDSN;
