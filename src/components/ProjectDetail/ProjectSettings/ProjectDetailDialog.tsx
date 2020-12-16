import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyClipboardBox from '../../common/CopyClipboardBox';

const useStyles = makeStyles({
  dialog: {
    padding: '30px 20px',
  },
});

const makeCodeSnippet = (dsn: string) => {
  return `import Panopticon from 'pan-opt';
  
const dsn = '${dsn}'

Panopticon.init(dsn);`;
};

interface IProps {
  dsn: string;
}

export default function ProjectDNSDialog(props: IProps): React.ReactElement {
  const classes = useStyles();
  const { dsn }: IProps = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Show DSN
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Box className={classes.dialog}>
          <CopyClipboardBox textContent={dsn} />
          <SyntaxHighlighter language="javascript" style={dark}>
            {makeCodeSnippet(dsn)}
          </SyntaxHighlighter>
        </Box>
      </Dialog>
    </Box>
  );
}
